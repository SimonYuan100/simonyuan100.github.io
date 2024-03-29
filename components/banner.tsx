
export default function Banner({ title, abstract, tag, center }: any) {
    return <div className="
        mx-0 md:mx-20 py-8 md:py-16 space-y-2 md:space-y-5 md:border-b border-gray-200 dark:border-gray-700
      bg-slate-100 dark:bg-slate-900/50 md:px-0 px-5 md:bg-transparent md:dark:bg-transparent
        ">
        <h1 className={`flex text-3xl items-start ${center && `justify-center`}  font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14`}>
            {title}
            {tag && <span className="px-2 mt-1 rounded-tl-md rounded-br-md rounded-tr-md tracking-wider bg-slate-600 text-white ml-2 text-xs font-light">{tag}</span>}
        </h1>
        <p className="text-md font-light leading-7 text-gray-500 dark:text-gray-400">
            {abstract}
        </p>
    </div>
}