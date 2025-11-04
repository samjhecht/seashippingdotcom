import { COMPANY_INFO } from "@/lib/constants";
import { Card, CardContent } from '@/components/ui/card';

interface Stat {
  line1: string;
  line2: string;
}

interface StatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    line1: "NETWORK COVERAGE",
    line2: "worldwide"
  },
  {
    line1: "U.S.A. DOMESTIC OFFICES",
    line2: `${String(COMPANY_INFO.officeCount)} owned & operated`
  },
  {
    line1: "SERVICE CONTRACTS",
    line2: "with all major carriers"
  },
];

export function Stats({ stats = defaultStats }: StatsProps) {
  return (
    <section className="py-8 bg-gray-100" aria-label="Company statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              style={{ backgroundColor: '#ee1c23' }}
              className="h-full"
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center text-white h-full min-h-[60px]">
                <div className="font-bold text-lg mb-1">
                  {stat.line1}
                </div>
                <div className="text-base">
                  {stat.line2}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
