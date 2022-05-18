import { createContext, ReactNode, useContext } from 'react'

export type UnsplashImage = {
  id: string
  description: string | null
  urls: {
    thumb: string
  }
  user: {
    name: string
  }
  likes: number
}

export interface APIService {
  getImages: () => Promise<UnsplashImage[]>
}

export const APIServiceContext = createContext<APIService>({
  getImages: () => Promise.resolve([]),
})

export function APIServiceProvider(props: {
  children: ReactNode
  mock?: boolean
}) {
  if (props.mock) {
    return (
      <APIServiceContext.Provider value={mock()}>
        {props.children}
      </APIServiceContext.Provider>
    )
  }

  const ctx: APIService = {
    getImages: async (): Promise<UnsplashImage[]> => {
      return fetch('https://api.unsplash.com/photos?page=1', {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${
            import.meta.env.VITE_APP_UNSPLASH_API_KEY
          }`,
        },
      }).then((res) => res.json())
    },
  }

  return (
    <APIServiceContext.Provider value={ctx}>
      {props.children}
    </APIServiceContext.Provider>
  )
}

export const useAPIService = () => useContext(APIServiceContext)

function mock(): APIService {
  return {
    getImages: async (): Promise<UnsplashImage[]> => {
      return import('../../fixtures/photos.json').then((res) => res.default)
    },
  }
}
