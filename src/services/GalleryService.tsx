import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UnsplashImage, useAPIService } from './APIService'

export interface GalleryService {
  state: GalleryServiceState
}

interface GalleryServiceState {
  isLoading: boolean
  images: UnsplashImage[]
}

export const GalleryServiceContext = createContext<GalleryService>({
  state: {
    isLoading: false,
    images: [],
  },
})

export function GalleryServiceProvider(props: { children: ReactNode }) {
  const api = useAPIService()

  const [state, setState] = useState<GalleryServiceState>({
    isLoading: true,
    images: [],
  })

  useEffect(() => {
    api.getImages().then((images) => {
      setState({
        isLoading: false,
        images,
      })
    })
  }, [])

  const ctx: GalleryService = {
    state,
  }

  return (
    <GalleryServiceContext.Provider value={ctx}>
      {props.children}
    </GalleryServiceContext.Provider>
  )
}

export const useGalleryService = () => useContext(GalleryServiceContext)
