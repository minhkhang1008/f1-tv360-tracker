import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, MapPin, Tv, CheckCircle2, Circle, AlertCircle, Trophy, Moon, Layers } from 'lucide-react';

// Dữ liệu F1 2026 chuẩn hóa kèm logic nhóm gói cước của TV360
const initialRaceData = [
  { id: 1, name: "Australian GP", date: "2026-03-08", packageId: "pkg_1", packageType: "Gói 7 ngày", price: 25000, track: "Albert Park", sessions: { p1: "08:30", p2: "12:00", p3: "08:30", q: "12:00", race: "11:00" } },
  { id: 2, name: "Chinese GP", date: "2026-03-15", packageId: "pkg_2", packageType: "Gói 7 ngày", price: 25000, track: "Thượng Hải", sessions: { p1: "10:30", p2: "14:30", p3: "14:00", q: "14:00", race: "14:00" } },
  { id: 3, name: "Japanese GP", date: "2026-03-29", packageId: "pkg_3", packageType: "Gói 7 ngày", price: 25000, track: "Suzuka", sessions: { p1: "09:30", p2: "13:00", p3: "09:30", q: "13:00", race: "12:00" } },
  { id: 4, name: "Bahrain GP", date: "2026-04-12", packageId: "pkg_4", packageType: "Gói 7 ngày", price: 25000, track: "Bahrain", sessions: { p1: "19:30", p2: "23:00", p3: "19:30", q: "23:00", race: "22:00" } },
  { id: 5, name: "Saudi Arabian GP", date: "2026-04-19", packageId: "pkg_5", packageType: "Gói 7 ngày", price: 25000, track: "Jeddah", sessions: { p1: "20:30", p2: "00:00", p3: "20:30", q: "00:00", race: "00:00" } },
  
  // Các chặng bỏ qua
  { id: 6, name: "Miami GP", date: "2026-05-03", packageId: "skip_1", packageType: "Không xem", price: 0, isSkipped: true, track: "Miami", sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },
  
  { id: 7, name: "Emilia Romagna GP", date: "2026-05-17", packageId: "pkg_7", packageType: "Gói 7 ngày", price: 25000, track: "Imola", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 8, name: "Monaco GP", date: "2026-05-24", packageId: "pkg_8", packageType: "Gói 7 ngày", price: 25000, track: "Monaco", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  
  // Các chặng bỏ qua
  { id: 9, name: "Canadian GP", date: "2026-06-07", packageId: "skip_2", packageType: "Không xem", price: 0, isSkipped: true, track: "Montreal", sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },

  // GÓI 30 NGÀY - NHÓM 1 (Chỉ tính tiền chặng đầu)
  { id: 10, name: "Barcelona-Catalunya GP", date: "2026-06-21", packageId: "pkg_group_1", packageType: "Gói 30 ngày (Châu Âu)", price: 50000, track: "Barcelona", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 11, name: "Austrian GP", date: "2026-06-28", packageId: "pkg_group_1", packageType: "Chung gói 30 ngày", price: 0, track: "Red Bull Ring", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 12, name: "British GP", date: "2026-07-05", packageId: "pkg_group_1", packageType: "Chung gói 30 ngày", price: 0, track: "Silverstone", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 13, name: "Belgian GP", date: "2026-07-19", packageId: "pkg_group_1", packageType: "Chung gói 30 ngày", price: 0, track: "Spa-Francorchamps", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 14, name: "Hungarian GP", date: "2026-07-26", packageId: "pkg_group_1", packageType: "Chung gói 30 ngày", price: 0, track: "Hungaroring", sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },

  { id: 15, name: "Dutch GP", date: "2026-08-23", packageId: "pkg_15", packageType: "Gói 7 ngày", price: 25000, track: "Zandvoort", sessions: { p1: "17:30", p2: "21:30", p3: "17:00", q: "21:00", race: "20:00" } },
  { id: 16, name: "Italian GP", date: "2026-09-06", packageId: "pkg_16", packageType: "Gói 7 ngày", price: 25000, track: "Monza", sessions: { p1: "17:30", p2: "21:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 17, name: "Azerbaijan GP", date: "2026-09-20", packageId: "pkg_17", packageType: "Gói 7 ngày", price: 25000, track: "Baku", sessions: { p1: "16:30", p2: "20:00", p3: "15:30", q: "19:00", race: "18:00" } },
  { id: 18, name: "Singapore GP", date: "2026-10-04", packageId: "pkg_18", packageType: "Gói 7 ngày", price: 25000, track: "Marina Bay", sessions: { p1: "16:30", p2: "20:00", p3: "16:30", q: "20:00", race: "19:00" } },
  
  // Các chặng bỏ qua
  { id: 19, name: "United States GP", date: "2026-10-18", packageId: "skip_3", packageType: "Không xem", price: 0, isSkipped: true, track: "Austin", sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },
  { id: 20, name: "Mexican GP", date: "2026-10-25", packageId: "skip_4", packageType: "Không xem", price: 0, isSkipped: true, track: "Mexico City", sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },

  // GÓI 30 NGÀY - NHÓM 2 (Chỉ tính tiền chặng đầu)
  { id: 21, name: "Sao Paulo GP", date: "2026-11-08", packageId: "pkg_group_2", packageType: "Gói 30 ngày (Cuối mùa)", price: 50000, track: "Interlagos", sessions: { p1: "21:30", p2: "01:00", p3: "21:30", q: "01:00", race: "00:00" } },
  { id: 22, name: "Las Vegas GP", date: "2026-11-21", packageId: "pkg_group_2", packageType: "Chung gói 30 ngày", price: 0, track: "Las Vegas", sessions: { p1: "09:30", p2: "13:00", p3: "09:30", q: "13:00", race: "13:00" } },
  { id: 23, name: "Qatar GP", date: "2026-11-29", packageId: "pkg_group_2", packageType: "Chung gói 30 ngày", price: 0, track: "Lusail", sessions: { p1: "20:30", p2: "00:00", p3: "19:30", q: "23:00", race: "23:00" } },
  { id: 24, name: "Abu Dhabi GP", date: "2026-12-06", packageId: "pkg_group_2", packageType: "Chung gói 30 ngày", price: 0, track: "Yas Marina", sessions: { p1: "16:30", p2: "20:00", p3: "17:30", q: "21:00", race: "20:00" } }
];

export default function App() {
  const [races] = useState(initialRaceData);
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('f1_tv360_purchases_v2');
    if (saved) {
      setPurchasedPackages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('f1_tv360_purchases_v2', JSON.stringify(purchasedPackages));
  }, [purchasedPackages]);

  const togglePurchase = (packageId) => {
    if (packageId.startsWith('skip')) return; // Không thể mua chặng đã bỏ qua
    
    setPurchasedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(pId => pId !== packageId) 
        : [...prev, packageId]
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const today = new Date();

  // Tìm chặng đua tiếp theo
  const nextRace = useMemo(() => {
    const upcoming = races.filter(r => new Date(r.date) >= today);
    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [races]);

  // Thống kê tài chính
  const stats = useMemo(() => {
    const totalCost = races.reduce((sum, r) => sum + (r.price || 0), 0);
    // Tính số tiền đã tiêu dựa trên các packageId đã mua (tìm giá của chặng master trong package)
    let spentCost = 0;
    purchasedPackages.forEach(pkgId => {
      const masterRace = races.find(r => r.packageId === pkgId && r.price > 0);
      if (masterRace) spentCost += masterRace.price;
    });
    
    return { total: totalCost, spent: spentCost, remaining: totalCost - spentCost };
  }, [races, purchasedPackages]);

  const filteredRaces = useMemo(() => {
    let result = [...races].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (filter === 'upcoming') {
      result = result.filter(r => new Date(r.date) >= today);
    } else if (filter === 'action-needed') {
      result = result.filter(r => 
        new Date(r.date) >= today && 
        !r.isSkipped && 
        !purchasedPackages.includes(r.packageId)
      );
    }
    return result;
  }, [races, filter, purchasedPackages]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">F1 2026 Tracker</h1>
              <p className="text-xs text-slate-400">Tối ưu hoá gói TV360</p>
            </div>
          </div>
          
          <div className="flex bg-slate-900 rounded-xl p-2 border border-slate-800 text-sm">
             <div className="px-3 border-r border-slate-700">
              <span className="block text-xs text-slate-500">Dự kiến mùa giải</span>
              <span className="font-semibold text-slate-300">{formatCurrency(stats.total)}</span>
            </div>
            <div className="px-3 border-r border-slate-700">
              <span className="block text-xs text-slate-500">Đã chi tiêu</span>
              <span className="font-semibold text-emerald-400">{formatCurrency(stats.spent)}</span>
            </div>
            <div className="px-3">
              <span className="block text-xs text-slate-500">Cần chuẩn bị thêm</span>
              <span className="font-semibold text-red-400">{formatCurrency(stats.remaining)}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner chặng tiếp theo */}
        {nextRace && (
          <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Trophy size={120} />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium mb-4">
                <AlertCircle size={14} /> Chặng đua tiếp theo
              </span>
              <h2 className="text-3xl font-bold text-white mb-2">{nextRace.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-1"><Calendar size={16} /> {formatDate(nextRace.date)}</span>
                <span className="flex items-center gap-1"><MapPin size={16} /> {nextRace.track}</span>
              </div>
              
              {/* Box Hành động */}
              {nextRace.isSkipped ? (
                <div className="bg-slate-900/80 rounded-lg p-4 border border-slate-800 flex items-center gap-3">
                  <Moon className="text-slate-500" size={24} />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Bạn sẽ không xem chặng này</p>
                    <p className="text-xs text-slate-500">Lý do: Lệch múi giờ</p>
                  </div>
                </div>
              ) : (
                !purchasedPackages.includes(nextRace.packageId) && (
                  <div className="bg-red-950/30 rounded-lg p-4 border border-red-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Cần mua gói để xem chặng này</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        {nextRace.packageId.includes('group') ? <Layers size={12}/> : <Tv size={12}/>}
                        Loại: {nextRace.packageType}
                      </p>
                    </div>
                    <button 
                      onClick={() => togglePurchase(nextRace.packageId)}
                      className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-red-900/20"
                    >
                      Đánh dấu đã mua ({formatCurrency(
                        races.find(r => r.packageId === nextRace.packageId && r.price > 0)?.price || 0
                      )})
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'upcoming', 'action-needed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filter === f 
                  ? 'bg-slate-200 text-slate-900' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {f === 'all' && 'Tất cả chặng'}
              {f === 'upcoming' && 'Sắp diễn ra'}
              {f === 'action-needed' && 'Cần mua gói'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRaces.map((race) => {
            const isPast = new Date(race.date) < new Date(today.setHours(0,0,0,0));
            const isBought = purchasedPackages.includes(race.packageId);
            const isGroupMaster = race.price > 0 && race.packageId.includes('group');
            const isGroupChild = race.price === 0 && race.packageId.includes('group');

            return (
              <div 
                key={race.id} 
                className={`bg-slate-900 rounded-xl border transition-all flex flex-col overflow-hidden ${
                  race.isSkipped ? 'border-slate-800/50 opacity-50 grayscale hover:grayscale-0' : 
                  isPast ? 'border-slate-800 opacity-70' : 
                  isGroupChild ? 'border-indigo-900/30' : 'border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className={`p-4 border-b flex justify-between items-start ${
                  race.isSkipped ? 'border-slate-800/50' : 
                  isGroupChild ? 'border-indigo-900/30 bg-indigo-950/10' : 'border-slate-800'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">R{race.id.toString().padStart(2, '0')}</span>
                      <h3 className={`font-bold text-sm ${race.isSkipped || isPast ? 'text-slate-400' : 'text-white'}`}>{race.name}</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {race.track}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${isPast ? 'text-slate-500' : 'text-slate-300'}`}>
                      {formatDate(race.date)}
                    </p>
                  </div>
                </div>

                {!race.isSkipped ? (
                  <div className="p-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs flex-grow">
                    <div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded">
                        <span className="text-slate-500">P1</span>
                        <span className="font-mono text-slate-300">{race.sessions.p1}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded mt-1">
                        <span className="text-slate-500">P2/SQ</span>
                        <span className="font-mono text-slate-300">{race.sessions.p2}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded">
                        <span className="text-slate-500">P3/Spr</span>
                        <span className="font-mono text-slate-300">{race.sessions.p3}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded mt-1 border border-red-900/30">
                        <span className="text-red-400 font-medium">Q/Race</span>
                        <span className="font-mono text-red-400">{race.sessions.q}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex-grow flex items-center justify-center text-slate-600 text-sm italic">
                    <Moon size={16} className="mr-2" /> Không có dữ liệu giờ
                  </div>
                )}

                {/* Phần trạng thái gói cước */}
                <div className={`p-3 mt-auto flex items-center justify-between border-t ${
                  race.isSkipped ? 'bg-slate-950/30 border-slate-800/50' :
                  isBought ? 'bg-emerald-950/30 border-emerald-900/50' : 
                  (isGroupChild ? 'bg-indigo-950/20 border-indigo-900/30' : 'bg-slate-950/50 border-slate-800')
                }`}>
                  <div className="flex-1">
                    {race.isSkipped ? (
                      <span className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Moon size={14} /> Lệch múi giờ
                      </span>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {race.packageId.includes('group') ? (
                            <Layers size={12} className={isBought ? "text-emerald-500" : "text-indigo-400"} />
                          ) : (
                            <Tv size={12} className={isBought ? "text-emerald-500" : "text-slate-400"} />
                          )}
                          <span className={`text-[11px] font-medium ${isBought ? 'text-emerald-400' : (isGroupChild ? 'text-indigo-300' : 'text-slate-300')}`}>
                            {race.packageType}
                          </span>
                        </div>
                        {!isGroupChild && (
                          <span className="text-xs font-semibold text-slate-400 block mt-1">
                            {formatCurrency(race.price)}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {!race.isSkipped && (
                    <button 
                      onClick={() => togglePurchase(race.packageId)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                        isBought 
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                          : (isGroupChild 
                              ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white')
                      }`}
                    >
                      {isBought ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                      {isBought ? 'Đã mua' : (isGroupChild ? 'Mua theo nhóm' : 'Chưa mua')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}