import React, { useMemo, useState } from 'react';

type DishType = '荤菜' | '素菜';

type Dish = {
  id: string;
  name: string;
  type: DishType;
  priceCny: number;
  romanticPrice: string;
};

type Cuisine = {
  id: string;
  name: string;
  dishes: Dish[];
};

type CartItem = Dish & { quantity: number; cuisine: string };

const ROMANTIC_PRICE_RULES: Array<{ max: number; label: string }> = [
  { max: 20, label: '一个吻 😘' },
  { max: 35, label: '一个抱抱 🤗' },
  { max: 50, label: '一起散步30分钟 🚶‍♀️🚶' },
  { max: 65, label: '一次手作早餐 🍳' },
  { max: 85, label: '一次肩颈按摩 💆' },
  { max: 120, label: '一次电影之夜 🎬' },
  { max: 160, label: '一次惊喜约会 🎁' },
  { max: Infinity, label: '家务全包一天 🧹' },
];

const CUISINES = [
  '浙菜',
  '徽菜',
  '豫菜',
  '湘菜',
  '赣菜',
  '川菜',
  '粤菜',
  '东北菜',
  '西餐',
  '面点',
  '炸鸡系列',
  '寿司系列',
  '奶茶系列',
  '果饮系列',
  '家常菜',
];

const meatSuffix = ['小炒', '煲', '香锅', '拌饭', '拼盘', '焗饭', '炖盅', '卷', '炙烤', '套餐'];
const vegSuffix = ['时蔬', '豆腐', '沙拉', '菌菇盅', '凉拌', '蒸品', '面', '汤', '饭', '甜品'];

const baseNames: Record<string, { meat: string[]; veg: string[] }> = {
  浙菜: { meat: ['东坡', '龙井虾仁', '绍兴黄酒鸡', '杭帮酱鸭', '雪菜黄鱼'], veg: ['西湖莼菜', '清炒笋尖', '桂花糖藕', '腐竹木耳', '梅干菜豆角'] },
  徽菜: { meat: ['臭鳜鱼', '黄山炖鸽', '胡适一品锅', '毛豆腐烩肉', '徽州刀板香'], veg: ['问政山笋', '石耳炖蛋', '黄山野菜', '清炒蕨菜', '徽州双冬'] },
  豫菜: { meat: ['汴京扒肉', '洛阳水席', '葱烧羊肉', '红焖肘子', '道口烧鸡'], veg: ['开封素三鲜', '河南烩面素卤', '番茄豆腐', '芝麻叶豆面', '香菇青菜'] },
  湘菜: { meat: ['剁椒鱼头', '小炒黄牛肉', '辣椒炒肉', '湘西腊肉', '口味虾'], veg: ['擂椒皮蛋', '手撕包菜', '蒜蓉空心菜', '湘味豆干', '酸辣藕片'] },
  赣菜: { meat: ['藜蒿炒腊肉', '三杯鸡', '宁都肉丸', '鄱阳湖鱼块', '瓦罐排骨'], veg: ['井冈山豆皮', '南昌凉拌藕', '赣南南瓜', '清炒苦瓜', '瓦罐萝卜'] },
  川菜: { meat: ['回锅肉', '宫保鸡丁', '水煮牛肉', '麻婆豆腐牛肉末', '夫妻肺片'], veg: ['鱼香茄子', '麻辣土豆丝', '干煸四季豆', '凉拌木耳', '椒麻杏鲍菇'] },
  粤菜: { meat: ['蜜汁叉烧', '豉汁蒸排骨', '白切鸡', '烧鹅拼盘', '避风塘虾'], veg: ['上汤娃娃菜', '蚝油生菜', '陈皮豆腐', '西芹百合', '罗汉斋'] },
  东北菜: { meat: ['锅包肉', '地三鲜肉版', '铁锅炖大鹅', '溜肉段', '小鸡炖蘑菇'], veg: ['地三鲜', '酸菜粉条', '凉拌拉皮', '蘸酱菜', '东北大拌菜'] },
  西餐: { meat: ['黑椒牛排', '香煎鸡排', '番茄肉酱意面', '烤肠拼盘', '奶油培根饭'], veg: ['凯撒沙拉', '焗蘑菇', '南瓜浓汤', '芝士玉米', '蒜香烤蔬'] },
  面点: { meat: ['牛肉拉面', '猪肉煎饺', '叉烧包', '鸡丝凉面', '牛肉锅贴'], veg: ['素三鲜水饺', '葱油拌面', '香菇菜包', '南瓜发糕', '红豆小圆子'] },
  炸鸡系列: { meat: ['经典原味炸鸡', '韩式甜辣鸡', '蒜香脆鸡块', '蜜汁鸡翅', '黑椒鸡柳'], veg: ['脆薯拼盘', '洋葱圈', '芝士玉米球', '蔬菜可乐饼', '炸杏鲍菇'] },
  寿司系列: { meat: ['三文鱼握寿司', '鳗鱼卷', '金枪鱼军舰', '炙烤牛肉卷', '天妇罗虾卷'], veg: ['牛油果卷', '黄瓜卷', '玉米沙拉军舰', '豆皮寿司', '素食拼盘'] },
  奶茶系列: { meat: ['芝士奶盖厚乳', '黑糖珍珠奶茶', '抹茶红豆奶', '焦糖布丁奶茶', '可可榛果奶'], veg: ['茉莉轻乳茶', '乌龙鲜奶', '椰椰冻冻', '桂花乌龙奶', '低糖麦香奶'] },
  果饮系列: { meat: ['西柚多多', '草莓酸奶昔', '芒果冰沙', '百香果气泡饮', '葡萄冻冻'], veg: ['青提茉莉', '柠檬薄荷茶', '苹果胡萝卜汁', '牛油果酸奶', '羽衣甘蓝果昔'] },
  家常菜: { meat: ['红烧肉', '可乐鸡翅', '番茄牛腩', '青椒肉丝', '糖醋里脊'], veg: ['番茄炒蛋', '麻婆豆腐', '清炒西兰花', '醋溜土豆丝', '蒜蓉生菜'] },
};

const romanticLabel = (price: number) => ROMANTIC_PRICE_RULES.find((rule) => price <= rule.max)?.label ?? '甜蜜加成';

const makeCuisine = (name: string): Cuisine => {
  const data = baseNames[name];
  const dishes: Dish[] = [];
  for (let i = 0; i < 10; i += 1) {
    const base = data.meat[i % data.meat.length];
    const priceCny = 28 + i * 6 + (name.length % 5) * 3;
    dishes.push({
      id: `${name}-m-${i}`,
      name: `${base}${meatSuffix[i % meatSuffix.length]}`,
      type: '荤菜',
      priceCny,
      romanticPrice: romanticLabel(priceCny),
    });
  }
  for (let i = 0; i < 10; i += 1) {
    const base = data.veg[i % data.veg.length];
    const priceCny = 18 + i * 5 + (name.length % 3) * 2;
    dishes.push({
      id: `${name}-v-${i}`,
      name: `${base}${vegSuffix[i % vegSuffix.length]}`,
      type: '素菜',
      priceCny,
      romanticPrice: romanticLabel(priceCny),
    });
  }
  return { id: name, name, dishes };
};

const menuData: Cuisine[] = CUISINES.map(makeCuisine);

export default function App() {
  const [activeCuisine, setActiveCuisine] = useState(menuData[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paid, setPaid] = useState(false);
  const [orderNo, setOrderNo] = useState('');

  const currentCuisine = useMemo(() => menuData.find((c) => c.id === activeCuisine)!, [activeCuisine]);

  const addToCart = (dish: Dish) => {
    if (paid) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...dish, quantity: 1, cuisine: currentCuisine.name }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    if (paid) return;
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)).filter((i) => i.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.priceCny * item.quantity, 0);

  const checkout = () => {
    if (!cart.length || paid) return;
    const ok = window.confirm(`本次需一次性结算 ¥${total}（不可拆单）。确认立即支付吗？`);
    if (!ok) return;
    setPaid(true);
    setOrderNo(`GF${Date.now().toString().slice(-8)}`);
  };

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800">
      <header className="p-4 md:p-6 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold">女朋友专属点餐小程序 💖</h1>
        <p className="text-sm text-slate-600">按菜系点菜，每个菜系 20 道（荤素均衡），支持一次性真实结算。</p>
      </header>

      <main className="grid md:grid-cols-[260px_1fr_360px] gap-4 p-4 md:p-6">
        <aside className="bg-white rounded-xl p-3 shadow-sm h-fit">
          <h2 className="font-semibold mb-2">菜系列表</h2>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {menuData.map((c) => (
              <button
                key={c.id}
                className={`px-3 py-2 rounded-lg text-left text-sm ${activeCuisine === c.id ? 'bg-rose-500 text-white' : 'bg-rose-100'}`}
                onClick={() => setActiveCuisine(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </aside>

        <section className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-1">{currentCuisine.name}</h2>
          <p className="text-sm text-slate-500 mb-4">共 {currentCuisine.dishes.length} 道菜（荤菜 10 + 素菜 10）</p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {currentCuisine.dishes.map((dish) => (
              <div key={dish.id} className="border rounded-lg p-3">
                <div className="flex justify-between gap-2">
                  <h3 className="font-medium">{dish.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${dish.type === '荤菜' ? 'bg-amber-100' : 'bg-emerald-100'}`}>{dish.type}</span>
                </div>
                <p className="text-sm mt-1">¥{dish.priceCny}</p>
                <p className="text-xs text-rose-500 mt-1">情侣价：{dish.romanticPrice}</p>
                <button onClick={() => addToCart(dish)} className="mt-3 w-full bg-slate-900 text-white text-sm py-1.5 rounded disabled:opacity-40" disabled={paid}>
                  {paid ? '已锁单' : '加入购物车'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-xl p-4 shadow-sm h-fit">
          <h2 className="text-lg font-semibold">订单结算</h2>
          <p className="text-xs text-slate-500 mb-3">结算规则：仅支持一次性支付，不可分次。</p>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {cart.length === 0 && <p className="text-sm text-slate-500">还没有选菜～</p>}
            {cart.map((item) => (
              <div key={item.id} className="border rounded-lg p-2">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-slate-500">{item.cuisine} · {item.romanticPrice}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">¥{item.priceCny * item.quantity}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="px-2 rounded bg-slate-100" disabled={paid}>-</button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-2 rounded bg-slate-100" disabled={paid}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3 space-y-2">
            <div className="flex justify-between font-semibold">
              <span>合计</span>
              <span>¥{total}</span>
            </div>
            <button onClick={checkout} disabled={!cart.length || paid} className="w-full bg-rose-500 text-white py-2 rounded disabled:opacity-40">
              {paid ? '已完成一次性结算' : '一次性结算'}
            </button>
            {paid && (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-sm">
                <p>✅ 支付成功，订单号：{orderNo}</p>
                <p>结算金额：¥{total}（已锁单）</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
