import type { DomainId } from '@/types/curriculum';

export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  /** Hidden achievements are only revealed once unlocked. */
  secret?: boolean;
  xp: number;
  group: 'milestones' | 'streaks' | 'mastery' | 'domains' | 'teaching' | 'craft';
}

const domainBadge = (id: DomainId, name: string, icon: string, tier: AchievementTier = 'gold'): Achievement => ({
  id: `domain-${id}`,
  name: `${name} Complete`,
  description: `Finish every unit in the ${name} domain.`,
  icon,
  tier,
  xp: 1000,
  group: 'domains',
});

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', name: 'First Light', description: 'Complete your first lesson.', icon: 'Sunrise', tier: 'bronze', xp: 50, group: 'milestones' },
  { id: 'first-test', name: 'First Verdict', description: 'Complete your first test.', icon: 'ClipboardCheck', tier: 'bronze', xp: 50, group: 'milestones' },
  { id: 'perfect-test', name: 'Flawless', description: 'Score 100% on any test.', icon: 'Target', tier: 'silver', xp: 150, group: 'milestones' },
  { id: 'first-teaching', name: 'First Lesson Taught', description: 'Submit your first teach-back explanation.', icon: 'Presentation', tier: 'bronze', xp: 75, group: 'teaching' },
  { id: 'first-challenge', name: 'Builder', description: 'Complete your first unit challenge.', icon: 'Hammer', tier: 'bronze', xp: 75, group: 'craft' },

  { id: 'streak-7', name: 'Seven Days', description: 'Study seven days in a row.', icon: 'Flame', tier: 'bronze', xp: 200, group: 'streaks' },
  { id: 'streak-14', name: 'Fortnight', description: 'Study fourteen days in a row.', icon: 'Flame', tier: 'silver', xp: 350, group: 'streaks' },
  { id: 'streak-30', name: 'A Month of Showing Up', description: 'Study thirty days in a row.', icon: 'Flame', tier: 'gold', xp: 700, group: 'streaks' },
  { id: 'streak-50', name: 'Fifty', description: 'Study fifty days in a row.', icon: 'Flame', tier: 'gold', xp: 1000, group: 'streaks' },
  { id: 'streak-75', name: 'Seventy-Five', description: 'Study seventy-five days in a row.', icon: 'Flame', tier: 'platinum', xp: 1500, group: 'streaks' },
  { id: 'streak-100', name: 'One Hundred Days', description: 'Study one hundred days in a row.', icon: 'Trophy', tier: 'platinum', xp: 2500, group: 'streaks' },

  { id: 'units-10', name: 'Ten Down', description: 'Complete 10 units.', icon: 'CheckCheck', tier: 'bronze', xp: 100, group: 'milestones' },
  { id: 'units-50', name: 'Fifty Concepts', description: 'Complete 50 units.', icon: 'CheckCheck', tier: 'silver', xp: 400, group: 'milestones' },
  { id: 'units-100', name: 'Halfway and Then Some', description: 'Complete 100 units.', icon: 'Milestone', tier: 'gold', xp: 800, group: 'milestones' },
  { id: 'units-200', name: 'Two Hundred', description: 'Complete 200 units.', icon: 'Milestone', tier: 'platinum', xp: 1600, group: 'milestones' },
  { id: 'units-214', name: 'All 214', description: 'Complete every unit in the curriculum.', icon: 'Crown', tier: 'platinum', xp: 3000, group: 'milestones' },

  { id: 'mastered-10', name: 'Ten Mastered', description: 'Reach Mastered on 10 units.', icon: 'Gem', tier: 'silver', xp: 300, group: 'mastery' },
  { id: 'mastered-50', name: 'Fifty Mastered', description: 'Reach Mastered on 50 units.', icon: 'Gem', tier: 'gold', xp: 900, group: 'mastery' },
  { id: 'teacher-10', name: 'Ten Taught', description: 'Reach Teacher level on 10 units.', icon: 'GraduationCap', tier: 'gold', xp: 900, group: 'teaching' },
  { id: 'teacher-50', name: 'Fifty Taught', description: 'Reach Teacher level on 50 units.', icon: 'GraduationCap', tier: 'platinum', xp: 2000, group: 'teaching' },

  domainBadge('PY', 'Python', 'Code2'),
  domainBadge('DSA', 'DSA', 'Binary'),
  domainBadge('NP', 'NumPy', 'Grid3x3'),
  domainBadge('PD', 'Pandas', 'Table2'),
  domainBadge('VIZ', 'Visualization', 'LineChart'),
  domainBadge('SQL', 'SQL', 'Database'),
  domainBadge('MATH', 'Mathematics', 'Sigma'),
  domainBadge('STAT', 'Statistics', 'Dices'),
  domainBadge('ML', 'Machine Learning', 'Brain', 'platinum'),
  domainBadge('DL', 'Deep Learning', 'Network', 'platinum'),
  domainBadge('NLP', 'NLP', 'MessageSquareText'),
  domainBadge('CV', 'Computer Vision', 'Eye'),
  domainBadge('GEN', 'Generative AI', 'Sparkles', 'platinum'),
  domainBadge('OPS', 'MLOps', 'Boxes'),

  { id: 'final-assessment', name: 'AI/ML Master', description: 'Pass the final mastery assessment.', icon: 'Crown', tier: 'platinum', xp: 5000, group: 'mastery' },
  { id: 'teacher-challenge', name: 'The Teacher', description: 'Complete the final teacher challenge.', icon: 'Award', tier: 'platinum', xp: 3000, group: 'teaching' },

  { id: 'comeback', name: 'Comeback', description: 'Return and complete a session after missing three or more days.', icon: 'RotateCcw', tier: 'silver', xp: 200, group: 'craft', secret: true },
  { id: 'night-owl', name: 'Night Owl', description: 'Complete a session after midnight.', icon: 'Moon', tier: 'bronze', xp: 50, group: 'craft', secret: true },
  { id: 'early-bird', name: 'Early Bird', description: 'Complete a session before 7am.', icon: 'Sunrise', tier: 'bronze', xp: 50, group: 'craft', secret: true },
  { id: 'mistake-slayer', name: 'Mistake Slayer', description: 'Resolve 25 entries in your mistake notebook.', icon: 'Eraser', tier: 'silver', xp: 300, group: 'craft' },
  { id: 'note-taker', name: 'Note Taker', description: 'Write notes on 20 different units.', icon: 'NotebookPen', tier: 'bronze', xp: 150, group: 'craft' },
];

export const ACHIEVEMENT_BY_ID = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));

export const TIER_STYLES: Record<AchievementTier, { ring: string; text: string; bg: string; label: string }> = {
  bronze: { ring: 'ring-amber-700/40', text: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-500/10', label: 'Bronze' },
  silver: { ring: 'ring-slate-400/40', text: 'text-slate-500 dark:text-slate-300', bg: 'bg-slate-400/10', label: 'Silver' },
  gold: { ring: 'ring-yellow-500/40', text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/12', label: 'Gold' },
  platinum: { ring: 'ring-violet-400/40', text: 'text-violet-500 dark:text-violet-300', bg: 'bg-violet-500/12', label: 'Platinum' },
};
