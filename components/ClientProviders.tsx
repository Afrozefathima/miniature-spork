'use client'
import { cartStore } from '@/lib/hooks/useCartStore'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { SWRConfig } from 'swr'

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const updateStore = () => {
    cartStore.persist.rehydrate() //if we add to cart in one window and go to the another window, the cart items persist in it as well
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', updateStore)
    window.addEventListener('focus', updateStore)
    return () => {
      document.removeEventListener('visibilitychange', updateStore)
      window.removeEventListener('focus', updateStore)
    }
  }, [])
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          toast.error(error.message)
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init)
          if (!res.ok) {
            throw new Error('An error occured while fetching the data')
          }
          return res.json()
        },
      }}
    >
      <Toaster />
      {children}
    </SWRConfig>
  )
}