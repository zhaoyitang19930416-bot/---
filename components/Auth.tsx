
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-6 animate-in zoom-in-95 duration-500">
      <div className="text-center">
        <h2 className="text-3xl serif font-bold mb-2">HerSpace ✨</h2>
        <p className="text-sm text-gray-500">{isLogin ? '欢迎回来，亲爱的' : '加入我们的隐形防空洞'}</p>
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-2">账号名称</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl glass-card focus:outline-none focus:ring-1 focus:ring-[#A68D85]" 
            placeholder="输入你的昵称..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-gray-400 ml-2">安全密码</label>
          <input 
            type="password" 
            className="w-full px-6 py-4 rounded-2xl glass-card focus:outline-none focus:ring-1 focus:ring-[#A68D85]" 
            placeholder="••••••••"
          />
        </div>
        <button 
          onClick={() => onLogin(username || '访客')}
          className="w-full py-4 bg-[#4A443F] text-white rounded-2xl font-bold shadow-lg shadow-[#4A443F]/20 active:scale-95 transition-all"
        >
          {isLogin ? '登录进入 🕊️' : '注册开启 ✨'}
        </button>
      </div>

      <button onClick={() => setIsLogin(!isLogin)} className="text-xs text-[#A68D85] hover:underline">
        {isLogin ? '还没有账号？现在注册' : '已有账号？直接登录'}
      </button>
    </div>
  );
};

export default Auth;
