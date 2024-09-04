'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import message from '@/message.json'

const Home = () => {
  return (
    <>
    <main className='flex-grow flex flex-col justify-center items-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'>Welcome to the land of anonymous</h1>
        <p className=' text-balance mt-3 md:mt-4 md:text-lg'>share your thoughts freely here.</p>
      </section>
      <Carousel className="w-full max-w-xs" plugins={[Autoplay({delay:2000})]}>
      <CarouselContent >
        {
          message.map((item, index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>{item.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{item.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
        <footer className="text-center p-4 md:p-6 font-thin">
          all rights reserver to sachin 😎
        </footer>
    </>
  )
}

export default Home