import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Calendar, MapPin, Tv, CheckCircle2, Circle, AlertCircle, Trophy, Moon, Layers, RefreshCw } from 'lucide-react';

const initialRaceData = [
  { id: 1, name: "Australian GP", date: "2026-03-08", packageId: "pkg_g1", packageType: "Gói 30 ngày (Đợt 1)", price: 29000, purchaseDate: "2026-03-07", track: "Albert Park", hasSprint: false, sessions: { p1: "08:30", p2: "12:00", p3: "08:30", q: "12:00", race: "11:00" } },
  { id: 2, name: "Chinese GP", date: "2026-03-15", packageId: "pkg_g1", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-03-07", track: "Thượng Hải", hasSprint: true, sessions: { p1: "10:30", sq: "14:30", sprint: "14:00", q: "14:00", race: "14:00" } },
  { id: 3, name: "Japanese GP", date: "2026-03-29", packageId: "pkg_g1", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-03-07", track: "Suzuka", hasSprint: false, sessions: { p1: "09:30", p2: "13:00", p3: "09:30", q: "13:00", race: "12:00" } },
  { id: 4, name: "Bahrain GP", date: "2026-04-12", packageId: "pkg_g2", packageType: "Gói 30 ngày (Đợt 2)", price: 29000, purchaseDate: "2026-04-11", track: "Bahrain", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "19:30", q: "23:00", race: "22:00" } },
  { id: 5, name: "Saudi Arabian GP", date: "2026-04-20", packageId: "pkg_g2", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-04-11", track: "Jeddah", hasSprint: false, sessions: { p1: "20:30", p2: "00:00", p3: "20:30", q: "00:00", race: "00:00" } },
  { id: 6, name: "Miami GP", date: "2026-05-04", packageId: "skip_1", packageType: "Không xem", price: 0, purchaseDate: null, isSkipped: true, track: "Miami", hasSprint: false, sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },
  { id: 7, name: "Canadian GP", date: "2026-05-25", packageId: "skip_2", packageType: "Không xem", price: 0, purchaseDate: null, isSkipped: true, track: "Montreal", hasSprint: true, sessions: { p1: "-", sq: "-", sprint: "-", q: "-", race: "-" } },
  { id: 8, name: "Monaco GP", date: "2026-06-07", packageId: "pkg_g3", packageType: "Gói 30 ngày (Đợt 3)", price: 29000, purchaseDate: "2026-06-06", track: "Monaco", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 9, name: "Barcelona-Catalunya GP", date: "2026-06-14", packageId: "pkg_g3", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-06-06", track: "Barcelona", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 10, name: "Austrian GP", date: "2026-06-28", packageId: "pkg_g3", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-06-06", track: "Red Bull Ring", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 11, name: "British GP", date: "2026-07-05", packageId: "pkg_g3", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-06-06", track: "Silverstone", hasSprint: true, sessions: { p1: "18:30", sq: "22:30", sprint: "18:00", q: "22:00", race: "21:00" } },
  { id: 12, name: "Belgian GP", date: "2026-07-19", packageId: "pkg_g4", packageType: "Gói 30 ngày (Đợt 4)", price: 29000, purchaseDate: "2026-07-18", track: "Spa-Francorchamps", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 13, name: "Hungarian GP", date: "2026-07-26", packageId: "pkg_g4", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-07-18", track: "Hungaroring", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 14, name: "Dutch GP", date: "2026-08-23", packageId: "pkg_g5", packageType: "Gói 30 ngày (Đợt 5)", price: 29000, purchaseDate: "2026-08-21", track: "Zandvoort", hasSprint: true, sessions: { p1: "17:30", sq: "21:30", sprint: "17:00", q: "21:00", race: "20:00" } },
  { id: 15, name: "Italian GP", date: "2026-09-06", packageId: "pkg_g5", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-08-21", track: "Monza", hasSprint: false, sessions: { p1: "17:30", p2: "21:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 16, name: "Spanish GP", date: "2026-09-13", packageId: "pkg_g5", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-08-21", track: "Madrid", hasSprint: false, sessions: { p1: "18:30", p2: "22:00", p3: "17:30", q: "21:00", race: "20:00" } },
  { id: 17, name: "Azerbaijan GP", date: "2026-09-26", packageId: "pkg_g6", packageType: "Gói 30 ngày (Đợt 6)", price: 29000, purchaseDate: "2026-09-25", track: "Baku", hasSprint: false, sessions: { p1: "15:30", p2: "19:00", p3: "15:30", q: "19:00", race: "18:00" } },
  { id: 18, name: "Singapore GP", date: "2026-10-11", packageId: "pkg_g6", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-09-25", track: "Marina Bay", hasSprint: true, sessions: { p1: "16:30", sq: "19:30", sprint: "16:00", q: "20:00", race: "19:00" } },
  { id: 19, name: "United States GP", date: "2026-10-26", packageId: "skip_3", packageType: "Không xem", price: 0, purchaseDate: null, isSkipped: true, track: "Austin", hasSprint: true, sessions: { p1: "-", sq: "-", sprint: "-", q: "-", race: "-" } },
  { id: 20, name: "Mexican GP", date: "2026-11-02", packageId: "skip_4", packageType: "Không xem", price: 0, purchaseDate: null, isSkipped: true, track: "Mexico City", hasSprint: false, sessions: { p1: "-", p2: "-", p3: "-", q: "-", race: "-" } },
  { id: 21, name: "Sao Paulo GP", date: "2026-11-09", packageId: "pkg_g7", packageType: "Gói 30 ngày (Đợt 7)", price: 29000, purchaseDate: "2026-11-08", track: "Interlagos", hasSprint: false, sessions: { p1: "22:30", p2: "02:00", p3: "21:30", q: "01:00", race: "00:00" } },
  { id: 22, name: "Las Vegas GP", date: "2026-11-22", packageId: "pkg_g7", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-11-08", track: "Las Vegas", hasSprint: false, sessions: { p1: "07:30", p2: "11:00", p3: "07:30", q: "11:00", race: "11:00" } },
  { id: 23, name: "Qatar GP", date: "2026-11-29", packageId: "pkg_g7", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-11-08", track: "Lusail", hasSprint: false, sessions: { p1: "20:30", p2: "00:00", p3: "21:30", q: "01:00", race: "23:00" } },
  { id: 24, name: "Abu Dhabi GP", date: "2026-12-06", packageId: "pkg_g7", packageType: "Chung gói 30 ngày", price: 0, purchaseDate: "2026-11-08", track: "Yas Marina", hasSprint: false, sessions: { p1: "16:30", p2: "20:00", p3: "17:30", q: "21:00", race: "20:00" } }
];

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/THAY_BANG_BIN_ID_CUA_BAN'; 
const JSONBIN_KEY = 'THAY_BANG_MASTER_KEY_CUA_BAN';

const getCountryCode = (raceName) => {
  const mapping = {
    "Australian GP": "au", "Chinese GP": "cn", "Japanese GP": "jp", "Bahrain GP": "bh",
    "Saudi Arabian GP": "sa", "Miami GP": "us", "Emilia Romagna GP": "it", "Monaco GP": "mc",
    "Canadian GP": "ca", "Barcelona-Catalunya GP": "es", "Spanish GP": "es", "Austrian GP": "at",
    "British GP": "gb", "Belgian GP": "be", "Hungarian GP": "hu", "Dutch GP": "nl",
    "Italian GP": "it", "Azerbaijan GP": "az", "Singapore GP": "sg", "United States GP": "us",
    "Mexican GP": "mx", "Sao Paulo GP": "br", "Las Vegas GP": "us", "Qatar GP": "qa", "Abu Dhabi GP": "ae"
  };
  return mapping[raceName] || "un";
};

const formatDateOffset = (dateStr, offsetDays) => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + offsetDays);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

export default function App() {
  const [races] = useState(initialRaceData);
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);

  const fetchPurchases = useCallback(async () => {
    setIsSyncing(true);
    setError(null);
    try {
      const response = await fetch(JSONBIN_URL, {
        headers: { 'X-Master-Key': JSONBIN_KEY }
      });
      if (!response.ok) throw new Error('Không thể tải dữ liệu đồng bộ');
      const data = await response.json();
      if (data.record && Array.isArray(data.record.purchases)) {
         setPurchasedPackages(data.record.purchases);
         localStorage.setItem('f1_tv360_purchases_sync', JSON.stringify(data.record.purchases));
      }
    } catch (err) {
      console.error(err);
      const saved = localStorage.getItem('f1_tv360_purchases_sync');
      if (saved) {
        setPurchasedPackages(JSON.parse(saved));
      } else {
          setError('Chưa cấu hình API đồng bộ. Đang dùng dữ liệu trên máy hiện tại.');
      }
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
    const interval = setInterval(fetchPurchases, 30000);
    return () => clearInterval(interval);
  }, [fetchPurchases]);

  const updateRemoteData = async (newPurchases) => {
    setIsSyncing(true);
    try {
      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_KEY
        },
        body: JSON.stringify({ purchases: newPurchases })
      });
      if (!response.ok) throw new Error('Lỗi khi lưu dữ liệu lên server');
      localStorage.setItem('f1_tv360_purchases_sync', JSON.stringify(newPurchases));
    } catch(err) {
       console.error(err);
       setError('Lỗi kết nối. Dữ liệu chỉ được lưu tạm trên máy này.');
       localStorage.setItem('f1_tv360_purchases_sync', JSON.stringify(newPurchases));
    } finally {
      setIsSyncing(false);
    }
  }

  const togglePurchase = (packageId) => {
    if (packageId.startsWith('skip')) return; 
    let newPurchases;
    if (purchasedPackages.includes(packageId)) {
        newPurchases = purchasedPackages.filter(pId => pId !== packageId);
    } else {
        newPurchases = [...purchasedPackages, packageId];
    }
    setPurchasedPackages(newPurchases);
    updateRemoteData(newPurchases);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const today = new Date();

  const nextRace = useMemo(() => {
    const upcoming = races.filter(r => new Date(r.date) >= today);
    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [races]);

  const stats = useMemo(() => {
    const totalCost = races.reduce((sum, r) => sum + (r.price || 0), 0);
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
      result = result.filter(r => new Date(r.date) >= today && !r.isSkipped && !purchasedPackages.includes(r.packageId));
    }
    return result;
  }, [races, filter, purchasedPackages]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-red-500/30">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-900/20">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">F1 2026 Tracker</h1>
                {isSyncing ? (
                    <RefreshCw size={14} className="text-slate-400 animate-spin" />
                ) : (
                    <button onClick={fetchPurchases} className="text-emerald-400 hover:text-emerald-300 transition-colors" title="Đồng bộ thủ công">
                        <CheckCircle2 size={14} />
                    </button>
                )}
              </div>
              <p className="text-xs text-slate-400">Tối ưu hoá gói TV360</p>
            </div>
          </div>
          
          <div className="flex bg-slate-900 rounded-xl p-2 border border-slate-800 text-sm shadow-inner">
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
        
        {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle size={16} /> {error}
            </div>
        )}

        {nextRace && (
          <section className="relative overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none transition-all">
               <img src={`https://flagcdn.com/w1280/${getCountryCode(nextRace.name)}.png`} className="w-full h-full object-cover mix-blend-luminosity" alt="" />
            </div>

            <div className="relative z-10 p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 text-red-400 border border-red-900/50 text-xs font-medium mb-4 shadow-sm">
                      <AlertCircle size={14} /> Chặng đua tiếp theo
                   </span>
                   <div className="flex items-center gap-4">
                      <img src={`https://flagcdn.com/w80/${getCountryCode(nextRace.name)}.png`} className="w-12 h-8 rounded shadow-sm object-cover border border-slate-700" alt="Flag" />
                      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{nextRace.name}</h2>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mt-3">
                      <span className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800"><MapPin size={14} className="text-slate-500" /> {nextRace.track}</span>
                   </div>
                 </div>
              </div>

              {!nextRace.isSkipped && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                 <div className="bg-slate-950/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-3.5 shadow-inner">
                   <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold border-b border-slate-800/80 pb-1.5">Thứ 6, {formatDateOffset(nextRace.date, -2)}</div>
                   <div className="space-y-2 mt-2">
                     <div className="flex justify-between items-center"><span className="text-slate-300 text-sm font-medium">Practice 1</span><span className="font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">{nextRace.sessions.p1}</span></div>
                     <div className="flex justify-between items-center"><span className="text-slate-300 text-sm font-medium">{nextRace.hasSprint ? 'Sprint Quali' : 'Practice 2'}</span><span className="font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">{nextRace.hasSprint ? nextRace.sessions.sq : nextRace.sessions.p2}</span></div>
                   </div>
                 </div>
                 
                 <div className="bg-slate-950/60 backdrop-blur-sm border border-slate-800/80 rounded-xl p-3.5 shadow-inner">
                   <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold border-b border-slate-800/80 pb-1.5">Thứ 7, {formatDateOffset(nextRace.date, -1)}</div>
                   <div className="space-y-2 mt-2">
                     <div className="flex justify-between items-center"><span className="text-slate-300 text-sm font-medium">{nextRace.hasSprint ? 'Sprint Race' : 'Practice 3'}</span><span className="font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">{nextRace.hasSprint ? nextRace.sessions.sprint : nextRace.sessions.p3}</span></div>
                     <div className="flex justify-between items-center"><span className="text-slate-200 text-sm font-medium">Qualifying</span><span className="font-mono text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{nextRace.sessions.q}</span></div>
                   </div>
                 </div>

                 <div className="bg-gradient-to-br from-red-950/40 to-slate-950/60 backdrop-blur-sm border border-red-900/50 rounded-xl p-3.5 shadow-inner flex flex-col justify-between">
                   <div className="text-[11px] text-red-400/80 uppercase tracking-wider mb-2 font-semibold border-b border-red-900/30 pb-1.5">Chủ Nhật, {formatDateOffset(nextRace.date, 0)}</div>
                   <div className="flex items-center justify-between mt-auto mb-1">
                     <span className="text-red-400 font-black tracking-widest text-sm drop-shadow-sm">MAIN RACE</span>
                     <span className="font-mono text-red-400 font-bold text-2xl drop-shadow-md">{nextRace.sessions.race}</span>
                   </div>
                 </div>
              </div>
              )}

              {nextRace.isSkipped ? (
                <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 flex items-center gap-3">
                  <Moon className="text-slate-500" size={24} />
                  <div>
                    <p className="text-sm font-medium text-slate-300">Bạn sẽ không xem chặng này</p>
                    <p className="text-xs text-slate-500">Lý do: Lệch múi giờ</p>
                  </div>
                </div>
              ) : (
                !purchasedPackages.includes(nextRace.packageId) && (
                  <div className="bg-red-950/20 rounded-xl p-4 border border-red-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm">
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Cần mua gói để xem chặng này</p>
                      {nextRace.purchaseDate && (
                          <p className="text-[13px] text-emerald-400 font-medium mb-1.5 flex items-center gap-1.5">
                              <Calendar size={14} /> Tối ưu: Mua vào ngày {formatDate(nextRace.purchaseDate)}
                          </p>
                      )}
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        {nextRace.packageId.includes('group') ? <Layers size={12}/> : <Tv size={12}/>}
                        Loại: {nextRace.packageType}
                      </p>
                    </div>
                    <button 
                      onClick={() => togglePurchase(nextRace.packageId)}
                      disabled={isSyncing}
                      className="whitespace-nowrap bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-red-900/20"
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
                  <div className="p-4 flex flex-col gap-2 flex-grow text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1.5 rounded border border-slate-800/50">
                        <span className="text-slate-500 font-medium">P1</span>
                        <span className="font-mono text-slate-300">{race.sessions.p1}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1.5 rounded border border-slate-800/50">
                        <span className="text-slate-500 font-medium">{race.hasSprint ? 'SQ' : 'P2'}</span>
                        <span className="font-mono text-slate-300">{race.hasSprint ? race.sessions.sq : race.sessions.p2}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1.5 rounded border border-slate-800/50">
                        <span className="text-slate-500 font-medium">{race.hasSprint ? 'Sprint' : 'P3'}</span>
                        <span className="font-mono text-slate-300">{race.hasSprint ? race.sessions.sprint : race.sessions.p3}</span>
                      </div>
                      <div className="flex justify-between items-center bg-slate-950/50 px-2 py-1.5 rounded border border-slate-800/50">
                        <span className="text-slate-300 font-medium">Quali</span>
                        <span className="font-mono text-slate-200">{race.sessions.q}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center bg-red-950/20 border border-red-900/50 px-3 py-2 rounded mt-1">
                      <span className="text-red-400 font-bold tracking-wider text-[11px]">MAIN RACE</span>
                      <span className="font-mono text-red-400 font-bold text-sm">{race.sessions.race}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex-grow flex items-center justify-center text-slate-600 text-sm italic">
                    <Moon size={16} className="mr-2" /> Không có dữ liệu giờ
                  </div>
                )}

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
                          <div>
                            <span className="text-xs font-semibold text-slate-400 block mt-1">
                              {formatCurrency(race.price)}
                            </span>
                            {!isBought && race.purchaseDate && (
                                <span className="text-[10px] text-emerald-500 font-medium block mt-0.5">
                                  Khuyên mua: {formatDate(race.purchaseDate)}
                                </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {!race.isSkipped && (
                    <button 
                      onClick={() => togglePurchase(race.packageId)}
                      disabled={isSyncing}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                        isBought 
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' 
                          : (isGroupChild 
                              ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white')
                      } disabled:opacity-50`}
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