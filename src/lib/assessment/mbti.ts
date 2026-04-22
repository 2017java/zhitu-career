import type { MBTIResult } from './types';

export const MBTI_TYPE_NAMES: Record<string, string> = {
  INTJ: '建筑师', INTP: '逻辑学家', ENTJ: '指挥官', ENTP: '辩论家',
  INFJ: '提倡者', INFP: '调停者', ENFJ: '主人公', ENFP: '竞选者',
  ISTJ: '物流师', ISFJ: '守卫者', ESTJ: '总经理', ESFJ: '执政官',
  ISTP: '鉴赏家', ISFP: '探险家', ESTP: '企业家', ESFP: '表演者',
};

export function calculateMBTI(dimensions: {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}): MBTIResult {
  const type = [
    dimensions.EI >= 0 ? 'E' : 'I',
    dimensions.SN >= 0 ? 'S' : 'N',
    dimensions.TF >= 0 ? 'T' : 'F',
    dimensions.JP >= 0 ? 'J' : 'P',
  ].join('');

  return {
    type,
    dimensions,
  };
}
