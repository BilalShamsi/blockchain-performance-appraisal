import React from 'react';
import type { Achievement } from '../types';
import { Award } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow">
      <div className={`p-2 rounded-full ${achievement.badgeColor}`}>
        <Award className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{achievement.title}</h3>
        <p className="text-sm text-gray-500">{achievement.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          Earned {new Date(achievement.earnedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}