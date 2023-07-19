import * as React from "react"
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

import { cn } from '../lib/utils'
import { Quote, User } from "lucide-react"

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://wallofgratitude.site"

// https://demo.react.email/preview/vercel-invite-user?view=source
// https://demo.react.email/preview/linear-login-code
export const GratitudeEmail = ({
  from = {
    name: '🐨',
    email: 'john@example.com'
  },
  to = {
    name: '🧸',
    email: 'jane@example.com',
    image: 'https://avatar.vercel.sh/hi@liallen.me'
  },
  logoLink = `${baseUrl}/icons/logo.png`,
  detailsLink = `${baseUrl}/gratitudes/1`,
  sendBackLink = `${baseUrl}/send-gratitude`,
  data: {
    bg,
    typeface,
    fontSize,
    tags,
    content,
    date,
  } = {
    bg: 'blue',
    typeface: 'sans',
    fontSize: 'base',
    tags: ['a', 'b', 'c'],
    content: 'Thank you for being awesome!',
    date: '07/12/2023',
  }
}: {
  to: {
    email: string
    image: string
    name?: string
  }
  from: {
    email: string
    name?: string
  }
  logoLink?: string
  detailsLink?: string
  sendBackLink?: string
  data: Omit<CardData, 'from' | 'to'>
}) => {
  const previewText = `${from.name} said "Thank you" via Wall of Gratitude`

  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Marck+Script&display=swap" rel="stylesheet" />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind config={{
        theme: {
          extend: {
            fontFamily: {
              cursive: ["Marck Script", "cursive"],
            },
          }
        }
      }}>
        <Body className="m-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={logoLink}
                width="120"
                height="100"
                alt="Logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-3xl font-bold text-black">
              💌 Thank you!
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Dear {to.name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{from.name}</strong>{' '}
              (<Link
                href={`mailto:${from.email}`}
                className="text-blue-600 no-underline"
              >
                {from.email}
              </Link>)
              has sent you a thank-you note!
            </Text>
            <Section>
              <Button pX={12} pY={12} className="rounded-md bg-indigo-500 text-white" href={detailsLink}>
                Check it out
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={detailsLink} className="text-blue-600 no-underline">
                {new URL(detailsLink).pathname}
              </Link>. In addition, you can give the kindness back by visiting:{" "}
              <Link href={sendBackLink + `?${new URLSearchParams([['to.name', from.name ?? ''], ['to.email', from.email ?? '']])}`} className="text-blue-600 no-underline">
                {new URL(sendBackLink).pathname}
              </Link>
            </Text>
            <Section className="mt-10">
              <Quote />
              <Card
                data={{
                  bg,
                  typeface,
                  fontSize,
                  tags,
                  content,
                  date,
                  from,
                  to: { image: to.image, name: to.name, email: to.email }
                }}
              />
              <Quote className="float-right" />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html >
  )
}

export default GratitudeEmail

interface CardData {
  tags: string[],
  bg: string,
  typeface: string,
  fontSize: string,
  content: string
  date: string
  from: { name?: string, }
  to: { image?: string, name?: string, email: string }
}

function Card({
  data: {
    bg,
    typeface,
    fontSize,
    tags,
    content,
    date,
    from,
    to,
  }
}: {
  data: CardData
}) {
  return (
    <Section className={cn("mx-auto h-[320px] w-[320px] rounded-lg border shadow-sm",
      bg === 'blue' && 'bg-blue-300',
      bg === 'red' && 'bg-red-300',
      bg === 'green' && 'bg-green-300',
      bg === 'yellow' && 'bg-yellow-300',
      bg === 'purple' && 'bg-purple-300',
      bg === 'pink' && 'bg-pink-300',
      bg === 'indigo' && 'bg-indigo-300',
      bg === 'orange' && 'bg-orange-300',
      bg === 'gray' && 'bg-gray-300',
      typeface === 'sans' && 'font-sans',
      typeface === 'serif' && 'font-serif',
      typeface === 'mono' && 'font-mono',
      typeface === 'cursive' && 'font-cursive',
      fontSize === 'sm' && 'text-sm',
      fontSize === 'base' && 'text-base',
      fontSize === 'xl' && 'text-xl',
      fontSize === '3xl' && 'text-3xl',
    )}>
      <div className="flex flex-col space-y-1.5 p-6 pt-0">
        <div className="flex items-center justify-end gap-2">
          <span className="relative order-2 flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {to.image
                ? <Img
                  src={to.image}
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
                : <User />
              }
            </span>
          </span>
          <div className="order-1 flex flex-col text-right">
            <span className="text-sm">{to.email}</span>
            <span className="text-sm">{to.name}</span>
          </div>
        </div>
      </div>
      <Text className="p-6 pt-0">
        {content}
      </Text>
      <Text className="my-1 flex gap-2 px-6 text-sm text-gray-500">
        {tags.map(tag => (
          <span>
            #{tag}
          </span>
        ))}
      </Text>
      <Text className="my-1 px-6 text-sm text-gray-500">
        {date}
      </Text>
      <Text className="my-1 px-6 text-sm font-semibold text-gray-500">
        - {from.name}
      </Text>
      <div className="flex items-center p-6 pt-0" />
    </Section>
  )
}
