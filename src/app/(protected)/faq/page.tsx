import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { i18n } from '@/lib/i18n'

export default function FaqPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{i18n.faqPage.title}</CardTitle>
          <CardDescription>{i18n.faqPage.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{i18n.faqPage.q1_title}</AccordionTrigger>
              <AccordionContent>{i18n.faqPage.q1_content}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{i18n.faqPage.q2_title}</AccordionTrigger>
              <AccordionContent>{i18n.faqPage.q2_content}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{i18n.faqPage.q3_title}</AccordionTrigger>
              <AccordionContent>{i18n.faqPage.q3_content}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{i18n.faqPage.q4_title}</AccordionTrigger>
              <AccordionContent>{i18n.faqPage.q4_content}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  )
}
