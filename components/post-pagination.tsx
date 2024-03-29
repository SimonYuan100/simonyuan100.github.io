import Link from "next/link";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

export default function Pagination({ pageSize, total, pageNumber }: any) {

    const totalPage = Math.ceil(total / pageSize)

    const previousInner = <a className={`flex flex-row space-x-4 pt-2 border-r dark:border-slate-700 transition-all hover:pl-5  hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:rounded-md ${pageNumber < 2 ? 'pointer-events-none opacity-20' : ''}`}>
        <div className='mt-1'><BsArrowLeftSquare /></div>
        <div className='flex flex-col text-right'>
            <span>上一页</span>
            <span className='text-xs opacity-50'>Previous</span>
        </div>
    </a>

    const nextInner = <a className={`flex flex-row justify-end pt-2 space-x-4 px-2 border-l dark:border-slate-700 transition-all hover:pr-5 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/10 hover:rounded-md ${pageNumber >= totalPage ? 'pointer-events-none opacity-20' : ''}`}>
        <div className='flex flex-col text-right'>
            <span>下一页</span>
            <span className='text-xs opacity-50'>Next</span>
        </div>
        <div className='mt-1'><BsArrowRightSquare /></div>
    </a>

    const previous = pageNumber > 1 ? <Link href={{ pathname: `/blogs/page/${+pageNumber - 1}` }}>{previousInner}</Link> : previousInner
    const next = pageNumber < totalPage ? <Link href={{ pathname: `/blogs/page/${+pageNumber + 1}` }}>{nextInner}</Link> : nextInner

    return <nav className="grid grid-cols-3 border-t dark:border-gray-700 py-8 transition-all">
        {previous}
        <div className='flex flex-col items-center space-y-2 pt-2 md:pt-0'>
            <div className='flex flex-row space-x-1 items-end md:border-b px-6 pb-1'>
                <span className='text-2xl leading-none'>{`${pageNumber}`}</span>
                <span className='text-xs'>/ {Math.ceil(total / pageSize)}</span>
            </div>
            <div className='hidden md:block text-xs opacity-50'>每页 {pageSize} 条，共 {total} 条</div>
        </div>
        {next}
    </nav>
}