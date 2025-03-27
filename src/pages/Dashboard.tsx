import React from 'react';
import { TrendingUp, Users, Star, Award, Medal, Target, Trophy } from 'lucide-react';
import AchievementBadge from '../components/AchievementBadge';
import type { Achievement } from '../types';

export default function Dashboard() {
  const stats = {
    averageRating: 4.5,
    totalReviews: 28,
    monthlyProgress: 15,
    rankingPosition: 3,
  };

  const recentRatings = [
    {
      id: 1,
      date: '2024-03-15',
      score: 4.8,
      comment: 'Excellent team collaboration and project delivery',
    },
    {
      id: 2,
      date: '2024-03-14',
      score: 4.5,
      comment: 'Great problem-solving skills',
    },
    {
      id: 3,
      date: '2024-03-13',
      score: 4.2,
      comment: 'Strong communication and leadership',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Rising Star',
      description: 'Received 10 consecutive positive reviews',
      earnedAt: '2024-03-15',
      icon: 'star',
      badgeColor: 'bg-yellow-500',
    },
    {
      id: '2',
      title: 'Top Performer',
      description: 'Ranked #1 in your department',
      earnedAt: '2024-03-14',
      icon: 'trophy',
      badgeColor: 'bg-purple-500',
    },
    {
      id: '3',
      title: 'Feedback Champion',
      description: 'Received 50 total reviews',
      earnedAt: '2024-03-10',
      icon: 'award',
      badgeColor: 'bg-blue-500',
    },
  ];

  const milestones = [
    {
      current: 28,
      target: 50,
      title: 'Reviews',
      icon: Star,
    },
    {
      current: 4.5,
      target: 4.8,
      title: 'Rating',
      icon: Medal,
    },
    {
      current: 3,
      target: 1,
      title: 'Rank',
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Rating
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.averageRating}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <TrendingUp className="self-center flex-shrink-0 h-5 w-5" />
                      <span className="sr-only">Increased by</span>
                      0.3
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Reviews
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stats.totalReviews}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Monthly Progress
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    +{stats.monthlyProgress}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Ranking Position
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    #{stats.rankingPosition}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Progress */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Milestone Progress
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {milestones.map((milestone) => {
              const Icon = milestone.icon;
              const progress = (milestone.current / milestone.target) * 100;
              return (
                <div key={milestone.title} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {milestone.title}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {milestone.current} / {milestone.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 rounded-full h-2"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Performance Reviews
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentRatings.map((rating) => (
                  <li key={rating.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {rating.date}
                        </p>
                        <p className="text-sm text-gray-500">{rating.comment}</p>
                      </div>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {rating.score}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}