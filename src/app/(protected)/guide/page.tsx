import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { i18n } from '@/lib/i18n'

export default function GuidePage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{i18n.guidePage.title}</CardTitle>
          <CardDescription>{i18n.guidePage.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">{i18n.guidePage.step1_title}</h3>
            <p className="text-muted-foreground">
              {i18n.guidePage.step1_content}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">{i18n.guidePage.step2_title}</h3>
            <p className="text-muted-foreground">
              {i18n.guidePage.step2_content}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">{i18n.guidePage.step3_title}</h3>
            <p className="text-muted-foreground">
              {i18n.guidePage.step3_content}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">{i18n.guidePage.step4_title}</h3>
            <p className="text-muted-foreground">
              {i18n.guidePage.step4_content}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
