import Image from 'next/image'
import Math from '../components/Math'
import OmakaseClick from '../components/OmakaseClick'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <main className="flex flex-col flex-grow items-center justify-center px-6 py-12 text-center">
        <div className="max-w-4xl w-full">
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 md:p-12">
            <Math />
          </div>
        </div>
        <OmakaseClick />
      </main>
      
      <footer className="text-center p-6 bg-white/30 backdrop-blur-sm border-t border-white/20">
        <p className="text-slate-600">
          Made with ❤️ by&nbsp;
          <Link href="https://jarrensj.com" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors" target="_blank">
            jarrensj
          </Link>
        </p>
      </footer>
    </div>
  )
}
