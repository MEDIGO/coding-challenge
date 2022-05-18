import { useGalleryService } from '../services/GalleryService'
import { UnsplashImage } from '../services/APIService'
import { css, cx } from '@emotion/css'

const styles = {
  list: css({
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  }),
  container: css({
    display: 'grid',
    gridTemplateColumns: '130px auto',
    gridTemplateRows: '1fr 1fr 3fr',
    height: '130px',
    gap: '16px',
    columnGap: '17px',
    gridTemplateAreas: `
        "image description"
        "image username"
        "image likes"
      `,
    backgroundColor: 'white',
  }),
  img: css({
    width: '130px',
    height: '130px',
    objectFit: 'cover',
    gridArea: 'image',
  }),
  description: css({
    whiteSpace: 'nowrap',
    gridArea: 'description',
    fontWeight: 'bold',
    marginTop: '10px',
  }),
  username: css({ gridArea: 'username' }),
  likes: css({ gridArea: 'likes' }),
}

export function ListView(props: { className?: string }) {
  const gallery = useGalleryService()

  return (
    <div className={cx(styles.list, props.className)}>
      {gallery.state.images.map((image) => (
        <ListEntry image={image} key={image.id} />
      ))}
    </div>
  )
}

function ListEntry({ image }: { image: UnsplashImage }) {
  return (
    <div className={styles.container}>
      <img
        src={image.urls.thumb}
        className={styles.img}
        alt={image.description ?? ''}
      />
      <div className={styles.description}>{image.description}</div>
      <div className={styles.username}>{image.user.name}</div>
      <div className={styles.likes}>{image.likes} likes</div>
    </div>
  )
}
