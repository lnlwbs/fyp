'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 min-h-[80vh] flex flex-col justify-center">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700/50 hover:dark:ring-gray-600">
          Discover the power of mindful movement with our expert-led Pilates classes{' '}
          <a href="/AboutUs" className="font-semibold text-indigo-600 dark:text-indigo-400">
            <span aria-hidden="true" className="absolute inset-0" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="text-center">
      <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl mb-6">
  Strengthen Your Core, Revitalize Your Mind
</h1>

        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/ProductPage"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  )
}
