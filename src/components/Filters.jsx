import { FiSliders, FiSearch } from "react-icons/fi";

const filterGroups = [
  { title: "Brand", options: ["XEROXII", "Edition", "Private"] },
  { title: "Collection", options: ["Chronograph", "GMT", "Moonphase"] },
  { title: "Strap", options: ["Ceramic", "Leather", "Steel"] },
  { title: "Dial Color", options: ["Platinum", "Silver", "Midnight"] },
];

export default function Filters() {
  return (
    <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Filters</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Curate your collection.</h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 p-3 text-zinc-200"><FiSliders className="h-5 w-5" /></div>
      </div>

      <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
        <FiSearch className="h-4 w-4" />
        <input placeholder="Search watches" className="w-full bg-transparent outline-none placeholder:text-zinc-500" />
      </label>

      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => (
                <button key={option} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:border-white/30 hover:text-white">{option}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">Price</p>
        <input type="range" min="3000" max="12000" defaultValue="7000" className="w-full accent-white" />
        <p className="mt-2 text-sm text-zinc-400">$3,000 – $12,000</p>
      </div>

      <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
        <label className="flex items-center gap-3"><input type="checkbox" className="accent-white" /> Available now</label>
        <label className="mt-3 flex items-center gap-3"><input type="checkbox" className="accent-white" /> Limited edition</label>
      </div>
    </aside>
  );
}
