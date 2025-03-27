export interface User {
  id: string;
  username: string;
  role: string;
  reputationScore: number;
  department: string;
}

export interface Rating {
  id: string;
  timestamp: string;
  fromUserId: string;
  toUserId: string;
  score: number;
  comment: string;
  transactionHash: string;
}

export interface DashboardStats {
  averageRating: number;
  totalReviews: number;
  monthlyProgress: number;
  rankingPosition: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  threshold: number;
  type: 'reviews' | 'reputation' | 'rank';
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  icon: string;
  badgeColor: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'milestone' | 'rating';
  timestamp: string;
  read: boolean;
}