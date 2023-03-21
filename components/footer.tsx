import Link from 'next/link';
import { ScriptProps } from 'next/script';
import Image from 'next/image';

export default function Footer(props: ScriptProps) {
    return (
        <footer className='border-t dark:border-gray-700'>
            <div className='container mx-auto pt-12 pb-20 opacity-50 hover:opacity-100 transition duration-500'>
                <div className='flex flex-row justify-center items-center space-x-5'>
                    <Link href={{ pathname: '/' }}>
                        <Image alt="avator" src='/images/profile.jpg' className='flex rounded-full justify-center text-blue-500 w-8 h-8' width={16} height={16}></Image>
                    </Link>
                    <code className=' text-xs font-mono text-gray-500'>$ echo &#34;enjoy life, enjoy coding.&#34; </code>
                </div>
            </div>
        </footer>
    )
}