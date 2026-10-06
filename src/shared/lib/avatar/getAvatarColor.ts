const AVATAR_COLORS = [
  '#5B8DEF',
  '#7C6FE8',
  '#E57373',
  '#F59E0B',
  '#10B981',
  '#14B8A6',
  '#EC4899',
  '#8B5CF6',
  '#3B82F6',
  '#EF6C57',
];

export const getAvatarColor = (value: string) => {
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};
