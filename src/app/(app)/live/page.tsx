'use client'
/* eslint-disable @next/next/no-img-element */
import Instagram from '@/assets/instagram'
import Plus18 from '@/assets/plus-18'
import Telegram from '@/assets/telegram'
import Youtube from '@/assets/youtube'
import { GradiantCard } from '@/components/gradiant-card'
import { InstallAppCard } from '@/components/install-app-card'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/video-player'
import Link from 'next/link'
export default function Live() {
  return (
    <div className="flex flex-col gap-6 justify-center">
      <h1 className="text-2xl text-center">
        Assista o vídeo abaixo e saiba como operar ao vivo comigo e buscar velas
        de 20X a 100X
      </h1>
      <GradiantCard>
        <VideoPlayer
          scriptSrc="https://scripts.converteai.net/cd42e2f1-44f3-470d-bb0a-328b0476d231/players/674bdebceb81f8e8fb46e96c/player.js"
          thumbnailSrc="https://images.converteai.net/cd42e2f1-44f3-470d-bb0a-328b0476d231/players/674bdebceb81f8e8fb46e96c/thumbnail.jpg"
          videoId="vid_674bdebceb81f8e8fb46e96c"
        />
      </GradiantCard>
      <GradiantCard>
        <div className="flex flex-col justify-center gap-4">
          <p className="text-center">
            Basta clicar no botão abaixo para participar da live AINDA HOJE
          </p>
          <Button
            className="uppercase py-8 w-full font-bold rounded-3xl bg-gradient-to-r from-[#27A7E7] to-[#0E77A9]"
            asChild
          >
            <Link href={'https://t.me/+KEUOtAfFASRmNjYx'}>
              <Telegram />
              Clique aqui e entre grupo do telegram
            </Link>
          </Button>
          <Button
            className="uppercase w-full py-8 font-bold rounded-3xl bg-gradient-to-r from-[#e52dcd] to-[#FCCF40]"
            asChild
          >
            <Link href={'https://www.instagram.com/eusoumatheusbrito/'}>
              <Instagram />
              Acessar perfil do instagram
            </Link>
          </Button>
          <Button
            className="uppercase py-8 w-full font-bold rounded-3xl bg-gradient-to-r from-red-700 to-red-500"
            asChild
          >
            <Link
              href={
                'https://www.youtube.com/playlist?list=PLobCVjkB33_Ob9P9YtH7Lz6fOzX3uWG8O'
              }
            >
              <Youtube />
              Canal do YouTube
            </Link>
          </Button>

          <span className="flex gap-2 justify-center items-center text-primary text-sm">
            <Plus18 className="size-6 fill-primary" />
            Jogue com responsabilidade!
          </span>
        </div>
      </GradiantCard>
      <InstallAppCard />
    </div>
  )
}
