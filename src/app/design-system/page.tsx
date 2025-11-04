import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DesignSystemPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-muted-foreground">
            Sea Shipping Line design system components with mobile-first
            approach and WCAG AA accessibility.
          </p>
        </div>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>
              Nautical theme colors meeting WCAG AA contrast requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-primary" />
                <p className="text-sm font-medium">Primary - Nautical Blue</p>
                <p className="text-xs text-muted-foreground">
                  hsl(211, 100%, 32%)
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-secondary" />
                <p className="text-sm font-medium">Secondary - Ocean Teal</p>
                <p className="text-xs text-muted-foreground">
                  hsl(187, 75%, 42%)
                </p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-lg bg-accent" />
                <p className="text-sm font-medium">Accent - Safety Orange</p>
                <p className="text-xs text-muted-foreground">
                  hsl(24, 95%, 53%)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Mobile-first buttons with 44px touch targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔍</Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              All buttons meet 44x44px minimum touch target on mobile
            </p>
          </CardFooter>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>
              Accessible form inputs with proper labeling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here" />
              </div>
              <Button>Submit Form</Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              All inputs use 16px font size on mobile to prevent zoom
            </p>
          </CardFooter>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>
              Responsive type scale with proper hierarchy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h1 className="text-5xl font-bold">Heading 1</h1>
                <p className="text-sm text-muted-foreground">text-5xl</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold">Heading 2</h2>
                <p className="text-sm text-muted-foreground">text-4xl</p>
              </div>
              <div>
                <h3 className="text-3xl font-semibold">Heading 3</h3>
                <p className="text-sm text-muted-foreground">text-3xl</p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold">Heading 4</h4>
                <p className="text-sm text-muted-foreground">text-2xl</p>
              </div>
              <div>
                <p className="text-base">
                  Body text uses 16px minimum on mobile for readability and to
                  prevent iOS zoom. The line height is set to 1.5 for optimal
                  readability.
                </p>
                <p className="text-sm text-muted-foreground">text-base</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>WCAG 2.1 AA compliant design</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Color contrast ratios meet 4.5:1 minimum (many achieve 7:1+)</li>
              <li>✓ Touch targets are 44x44px minimum on mobile</li>
              <li>✓ Font size is 16px minimum on mobile</li>
              <li>✓ Keyboard navigation with visible focus indicators</li>
              <li>✓ Screen reader compatible with semantic HTML</li>
              <li>✓ Reduced motion support for animations</li>
              <li>✓ High contrast mode support</li>
            </ul>
          </CardContent>
        </Card>

        {/* Mobile-First */}
        <Card>
          <CardHeader>
            <CardTitle>Mobile-First Breakpoints</CardTitle>
            <CardDescription>
              Responsive design starting from mobile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-mono font-semibold">xs: 320px</span> -
                Extra small phones
              </p>
              <p>
                <span className="font-mono font-semibold">sm: 640px</span> -
                Mobile devices
              </p>
              <p>
                <span className="font-mono font-semibold">md: 768px</span> -
                Tablets
              </p>
              <p>
                <span className="font-mono font-semibold">lg: 1024px</span> -
                Desktop
              </p>
              <p>
                <span className="font-mono font-semibold">xl: 1280px</span> -
                Large desktop
              </p>
              <p>
                <span className="font-mono font-semibold">2xl: 1536px</span> -
                Extra large desktop
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
