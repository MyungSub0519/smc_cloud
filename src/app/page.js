/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6vXq708FlJr
 */
import { Button } from "@/components/ui/button"
import { SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex-1 p-6 ">
    <div className="rounded-lg shadow p-6  mb-4 ">
      <h2 className="text-xl font-bold">SMCLOUD 자원 사용현황</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
  <div className=" rounded-lg shadow p-6  ">
    <h2 className="text-xl font-bold mb-4 ">SI 서버</h2>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 스펙 : 라즈베리파이3 4core CPU, 1G Memory</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> CPU 로드율 : 22% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 메모리 사용률 : 90% ❗</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> swap 사용률 : 3% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> Health Check : ✔ </div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 네트워크 사용률 : 120kb/s ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 디스크 사용률 : 60% ✔</div>
    
  </div>
  <div className=" rounded-lg shadow p-6  ">
    <h2 className="text-xl font-bold mb-4">SDS 서버</h2>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 스펙 : 라즈베리파이3 4core CPU, 1G Memory</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> CPU 로드율 : 22% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 메모리 사용률 : 90% ❗</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> swap 사용률 : 3% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> Health Check : ✔ </div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 네트워크 사용률 : 120kb/s ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 디스크 사용률 : 60% ✔</div>

  </div>
  <div className=" rounded-lg shadow p-6  ">
  <h2 className="text-xl font-bold mb-4">CONSOLE 서버</h2>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 스펙 : 라즈베리파이3 4core CPU, 1G Memory</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> CPU 로드율 : 22% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 메모리 사용률 : 90% ❗</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> swap 사용률 : 3% ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> Health Check : ✔ </div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 네트워크 사용률 : 120kb/s ✔</div>
    <div className="flex items-center space-x-2 text-gray-800 dark:text-white"> 디스크 사용률 : 60% ✔</div>
  </div>
  </div>
  </main>
  )
}
