import OpenAI from 'openai';
import type { DifficultyLevel, AIMoveResponse } from '../types/chess';
import { getMovePrompt, getTeachingPrompt, getMoveSuggestionPrompt } from '../utils/promptTemplates';
import { extractMove } from '../utils/moveNotation';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env file.');
}

const openai = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : null;

export async function getAIMove(
  fen: string,
  difficulty: DifficultyLevel,
  teachingMode: boolean
): Promise<AIMoveResponse> {
  if (!openai) {
    throw new Error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
  }

  try {
    const prompt = getMovePrompt(fen, difficulty, teachingMode);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a chess engine. Respond with chess moves in UCI notation (e.g., "e2e4").',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: difficulty === 'beginner' ? 0.7 : difficulty === 'intermediate' ? 0.5 : 0.3,
      max_tokens: teachingMode ? 150 : 50,
    });

    const response = completion.choices[0]?.message?.content?.trim() || '';
    
    // Extract move from response
    const move = extractMove(response);
    
    if (!move) {
      throw new Error('Could not parse move from AI response');
    }

    // Extract explanation if teaching mode is on
    let explanation: string | undefined;
    if (teachingMode && response.includes('\n')) {
      const lines = response.split('\n');
      explanation = lines.slice(1).join(' ').trim();
    }

    return {
      move,
      explanation,
    };
  } catch (error) {
    console.error('Error getting AI move:', error);
    throw error;
  }
}

export async function getMoveExplanation(
  fen: string,
  lastMove: string,
  difficulty: DifficultyLevel
): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key is not configured.');
  }

  try {
    const prompt = getTeachingPrompt(fen, lastMove, difficulty);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a chess teacher helping students learn the game.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error getting move explanation:', error);
    throw error;
  }
}

export async function getMoveSuggestion(
  fen: string,
  playerColor: 'w' | 'b',
  difficulty: DifficultyLevel
): Promise<AIMoveResponse> {
  if (!openai) {
    throw new Error('OpenAI API key is not configured.');
  }

  try {
    const prompt = getMoveSuggestionPrompt(fen, playerColor, difficulty);
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a chess coach helping players improve.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.6,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content?.trim() || '';
    const move = extractMove(response);
    
    if (!move) {
      throw new Error('Could not parse move from AI response');
    }

    const explanation = response.replace(move, '').trim();

    return {
      move,
      explanation,
    };
  } catch (error) {
    console.error('Error getting move suggestion:', error);
    throw error;
  }
}

