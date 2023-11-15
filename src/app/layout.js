import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link"
import { SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SMCLOUD PLATFORM',
  description: 'cloud platform for smc',
}


// 네비게이션 바 컴포넌트
const NavBar = () => (
  
  <nav className="flex items-center justify-between px-6 py-4 border-b shadow-lg">
  <Link href="/">
    <div className="flex items-center space-x-5">
      <svg
        className=" h-7 w-7 text-blue-500"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
      <h1 className="text-2xl font-bold text-blue-500">SMClOUD PLATFORM</h1>
    </div>
    </Link>
        <div className="relative">
          <svg
            className=" absolute left-3 top-2 h-6 w-6 text-gray-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            accessKey="s"
            className="pl-10 pr-5 rounded-md h-10 bg-gray-100 dark:bg-gray-700 focus:outline-none"
            list="menu-items"
            placeholder="검색(alt + s)"
            title="Press alt + s to open search window"
            type="text"
          />
          <datalist id="menu-items" >
            <Link href="/">  <option value="Dashboard"  /> </Link>
            <option value="Instance" />
            <option value="SDS" />
            <option value="SSD" />
            <option value="S2" />
            <option value="SES" />
          </datalist>
          <datalist id="menu-items">
            <option value="Dashboard"  />
            <option value="Instance" />
            <option value="SDS" />
            <option value="SSD" />
            <option value="S2" />
            <option value="SES" />
          </datalist>
        </div>
    <div className="flex items-center space-x-10">
      <Select>
        <SelectTrigger>
        <div className="text-gray-800 dark:text-white">yhw@gmail.com</div>

          <span className="sr-only">Open user menu</span>
        </SelectTrigger>
        <SelectContent className="bg-gray-100 dark:bg-gray-700">
          <SelectGroup>
            <SelectItem value="settings">Account Settings</SelectItem>
            <SelectItem value="notifications">Notifications</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </nav>
);

// 사이드바 컴포넌트
const SideBar = () => (
  <aside className="w-64 bg-gray-100 dark:bg-gray-700 p-6">
  <nav>
    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="/"
    >
      Dashboard
    </Link>
    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="/instance"
    >
      Instance
    </Link>
    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="/sds"
    >
      SDS
    </Link>
    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="ssd"
    >
      SSD
    </Link>
    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="s2"
    >
      S2
    </Link>

    <Link
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white"
      href="ses"
    >
      SES
    </Link>
  </nav>
</aside>
);

// 메인 레이아웃 컴포넌트 (비어 있는 상태)
const MainLayout = ({ children }) => (
  <main className="flex-1 p-6">
    {children}
  </main>
);

// 루트 레이아웃 컴포넌트
export default function RootLayout({ children }) {
  const handleChange = (e) => {
		setSearch(e.target.value)
    }
    
    const handleKeyDown = (e) => {
    	if(e.key === 'Enter') {
        	console.log("hello")
        }
    }
  return (
    <html lang="en">
      <body>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
        <NavBar />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <MainLayout>
            {children}
          </MainLayout>
        </div>
      </div>
      </body>
    </html>
  );
}
