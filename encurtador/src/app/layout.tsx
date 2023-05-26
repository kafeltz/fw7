
import './globals.css'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react';
import Head from 'next/head';


export const metadata = {
  title: 'FW7 Challenge',
  description: 'Desafio da FW7 para a criação de um programa que encurta uma URL.',
}

const navigation = [
  { name: 'FW7 Challenge', href: '#', current: true },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
       <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>

      <body>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Encurtador de URLs</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
