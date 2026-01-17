import { Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Terminal className="h-5 w-5 text-cyan-500" />
            <span className="text-lg font-bold text-slate-200">Vortex.Dev</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition">System Status</a>
            <a href="#" className="hover:text-cyan-400 transition">API Docs</a>
            <a href="#" className="hover:text-cyan-400 transition">Security</a>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 text-center text-xs text-slate-600 font-mono">
          &copy; {new Date().getFullYear()} Vortex Enterprise Systems. All nodes operational.
        </div>
      </div>
    </footer>
  );
};

export default Footer;