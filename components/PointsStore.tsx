
import React from 'react';
import { PointItem, User } from '../types';

interface PointsStoreProps {
  user: User;
  onExchange: (item: PointItem) => void;
}

const ITEMS: PointItem[] = [
  { id: '1', name: '职场烧烤资助金', cost: 1000, icon: '🍢', category: '生活' },
  { id: '2', name: '高级职场办公用品', cost: 500, icon: '📔', category: '办公' },
  { id: '3', name: '职场加油补贴', cost: 800, icon: '⛽', category: '出行' },
  { id: '4', name: '下午茶精致套餐', cost: 300, icon: '🍰', category: '生活' },
  { id: '5', name: '通勤打车红包', cost: 200, icon: '🚕', category: '出行' },
];

const PointsStore: React.FC<PointsStoreProps> = ({ user, onExchange }) => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="p-6 bg-[#4A443F] text-white rounded-[2rem] shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-xs opacity-60 uppercase tracking-widest">我的点数能量 ✨</p>
          <h3 className="text-4xl font-mono mt-1">{user.points} <span className="text-sm">pts</span></h3>
        </div>
        <div className="absolute top-0 right-0 p-8 text-6xl opacity-10">💎</div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">可兑换资产</h4>
        <div className="grid grid-cols-1 gap-3">
          {ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onExchange(item)}
              disabled={user.points < item.cost}
              className="flex items-center justify-between p-4 bg-white/60 rounded-2xl border border-white/40 hover:bg-white/80 transition-all disabled:opacity-40"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] text-gray-400">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-[#A68D85]">{item.cost} pts</p>
                <p className="text-[10px] text-gray-400">{user.points >= item.cost ? '点击兑换' : '积分不足'}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsStore;
