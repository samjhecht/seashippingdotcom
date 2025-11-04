'use client';

import {
  FileText,
  Wrench,
  Calendar,
  MapPin,
  ExternalLink,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const forms = [
  {
    name: 'EU Import Control System 2 (ICS2) Form',
    url: '/forms/EU%20Import%20Cargo%20System%202%20Form.pdf',
  },
  {
    name: 'Foreign Ports of Call Reference Guide',
    url: '/forms/Foreign%20Ports%20of%20Call%20Reference%20Guide.pdf',
  },
  {
    name: 'ICC IncoTerms Rules 2020',
    url: '/forms/ICC%20Incoterms%20Rules%202020%20Guide.pdf',
  },
  {
    name: 'IMO Dangerous Goods Declaration',
    url: '/forms/IMO%20Dangerous%20Goods%20Declaration.pdf',
  },
  {
    name: 'Importer Security Filing 10+2 Form',
    url: '/forms/Importer%20Security%20Filing%2010+2%20Form.pdf',
  },
  {
    name: 'LAX Customs Auto Title Validation Form',
    url: '/forms/US%20Customs%20Auto%20Cover%20Letter%20Template.pdf',
  },
  {
    name: 'Road Weight & Size Limitations by State',
    url: '/forms/Road%20Weight_Size%20Limitations%20by%20State.pdf',
  },
  {
    name: "Shipper's Export Declaration 7525-V",
    url: '/forms/Shippers%20Export%20Declaration-7525v.pdf',
  },
  {
    name: 'SOLAS Container Weight Verification',
    url: '/forms/Solas%20Container%20Weight%20Verification%20Requirement.pdf',
  },
  {
    name: 'SSL Bill of Lading Terms',
    url: '/forms/SSL%20Bill%20of%20Lading%20Terms.pdf',
  },
  {
    name: 'SSL Cargo Claim Notice',
    url: '/forms/SSL%20Cargo%20Claim%20Notice.pdf',
  },
  {
    name: 'SSL Carrier to Carrier Agreement',
    url: '/forms/SSL%20Carrier%20to%20Carrier%20Agreement.pdf',
  },
  {
    name: 'SSL Claim Procedure',
    url: '/forms/SSL%20Claim%20Procedure.pdf',
  },
  {
    name: 'SSL Credit Policy & Application - Oakland',
    url: '/forms/SSL%20Credit%20Policy%20and%20Application.pdf',
  },
  {
    name: 'SSL Credit Policy & Application - Red Bank',
    url: '/forms/SSL%20Credit%20Policy%20and%20Application-Red%20Bank.pdf',
  },
  {
    name: 'SSL CTPAT Certificate',
    url: '/forms/ssl_ctpat.pdf',
  },
  {
    name: 'SSL Drain & Disconnect Letter',
    url: '/forms/SSL%20Drain%20and%20Disconnect%20Letter.pdf',
  },
  {
    name: 'SSL Export Power of Attorney - Oakland',
    url: '/forms/SSL%20Export%20Power%20of%20Attorney%20-%20SSL%20(CA).pdf',
  },
  {
    name: 'SSL Export Power of Attorney - Red Bank',
    url: '/forms/SSL%20Export%20Power%20of%20Attorney%20-%20SSL.pdf',
  },
  {
    name: "SSL Forwarder's Cargo Receipt Conditions",
    url: '/forms/SSL%20Forwarders%20Cargo%20Receipt%20Terms_Conditions.pdf',
  },
  {
    name: 'SSL Fumigation Policy',
    url: '/forms/SSL%20Fumigation%20Policy.pdf',
  },
  {
    name: 'SSL Global Points Listing',
    url: '/forms/SSL%20FCL%20Point%20Scope.xlsx',
  },
  {
    name: 'SSL Guide to Carnets',
    url: '/forms/SSL%20Guide%20to%20Carnets.pdf',
  },
  {
    name: 'SSL Hazardous Materials Policy',
    url: '/forms/SSL%20Hazardous%20Materials%20Policy.pdf',
  },
  {
    name: 'SSL Heavy Haul Terms & Conditions',
    url: '/forms/SSL%20Heavy%20Haul%20Terms_Conditions.pdf',
  },
  {
    name: 'SSL Household Goods/Personal Effects Form',
    url: '/forms/SSL%20Household%20Goods%20Personal%20Effects%20Form.pdf',
  },
  {
    name: 'SSL Import Power of Attorney',
    url: '/forms/SSL%20Import%20Power%20of%20Attorney.pdf',
  },
  {
    name: 'SSL Intent to Export Vehicle Form',
    url: '/forms/SSL%20Intent%20to%20Export%20Vehicle%20Form.pdf',
  },
  {
    name: 'SSL Intent to File Claim Receipt',
    url: '/forms/SSL%20Intent%20to%20File%20Claim%20Receipt.pdf',
  },
  {
    name: 'SSL Map of Paperless Bills of Lading Eligibility',
    url: '/forms/SSL%20Map%20of%20Paperless%20Bills%20of%20Lading%20Eligibility.pdf',
  },
  {
    name: 'SSL Office & Staff Listing',
    url: '/forms/SSL%20Full%20Style%20Contact%20Details.pdf',
  },
  {
    name: 'SSL Official Holiday Observances - 2025',
    url: '/forms/SSL%20Official%20Holiday%20Observances.pdf',
  },
  {
    name: 'SSL Online Pricing Instructional Aide',
    url: '/forms/SSL%20On-Line%20Pricing%20Instructional%20Aide.pdf',
  },
  {
    name: 'SSL Partner Security Form',
    url: '/forms/SSL%20Partner%20Security%20Form.pdf',
  },
  {
    name: 'SSL Verified Gross Mass Certification Form',
    url: '/forms/SSL%20Verified%20Gross%20Mass%20Form.pdf',
  },
];

const industryTools = [
  { name: 'American Shipper', url: 'https://www.freightwaves.com/american-shipper' },
  {
    name: 'Australian Annual Packing Declaration',
    url: 'https://seashipping.com/forms/Australian%20Annual%20Packing%20Declaration%20ISPM15.pdf',
  },
  {
    name: 'Australian Free Trade Duty-Free Declaration',
    url: 'https://seashipping.com/forms/Australian%20Free%20Trade%20Duty-Free%20Declaration.pdf',
  },
  { name: 'Automated Commercial Environment (ACE)', url: 'https://ace.cbp.gov/s/login/' },
  { name: 'Big Schedules', url: 'https://www.bigschedules.com/' },
  {
    name: 'Calling Codes (International)',
    url: 'https://www.nationsonline.org/oneworld/international-calling-codes.htm',
  },
  { name: 'CargoSmart', url: 'https://www.cargosmart.com/en-us/' },
  {
    name: 'CFR 49 DOT Placard Tables',
    url: 'https://www.labelmaster.com/resources/placardfinder/dot-placard-tables',
  },
  { name: 'City Distance Tool', url: 'https://geobytes.com/citydistancetool/' },
  {
    name: 'Container Specifications',
    url: 'https://seashipping.com/forms/Ocean%20Container%20Specifications.pdf',
  },
  { name: 'Currency Converter', url: 'https://www.xe.com/' },
  {
    name: 'CTPAT',
    url: 'https://www.cbp.gov/border-security/ports-entry/cargo-security/ctpat',
  },
  { name: 'Dangerous Goods Advisory Council', url: 'http://www.dgac.org/' },
  { name: 'Department of Transportation', url: 'https://www.transportation.gov/' },
  { name: 'e2open (INTTRA)', url: 'https://www.inttra.com/' },
  { name: 'Export Bureau', url: 'https://www.exportbureau.com/' },
  { name: 'Federal Maritime Commission', url: 'https://www.fmc.gov/' },
  {
    name: 'Fumigation Services',
    url: 'https://www.prestox.com/fumigation/container-fumigation/index.html',
  },
  { name: 'Google Maps', url: 'https://www.google.com/maps/' },
  {
    name: 'Hazardous Materials Policy (SSL)',
    url: 'https://seashipping.com/forms/SSL%20Hazardous%20Materials%20Policy.pdf',
  },
  { name: 'Import Genius', url: 'https://www.importgenius.com/' },
  {
    name: 'ICC Incoterms Rules 2020',
    url: 'https://seashipping.com/forms/ICC%20Incoterms%20Rules%202020%20Guide.pdf',
  },
  { name: 'Infor Nexus', url: 'https://www.infor.com/solutions/scm/infor-nexus' },
  { name: 'International Association of Movers', url: 'https://www.iamovers.org/' },
  {
    name: 'International Port Code Lookup',
    url: 'https://www.sfmx.org/wp-content/uploads/2017/10/World-Port-Codes-and-Names.pdf',
  },
  { name: 'International Trade Administration', url: 'https://www.trade.gov/' },
  { name: 'Journal of Commerce', url: 'https://www.joc.com/' },
  { name: 'Linescape', url: 'https://www.linescape.com/' },
  { name: 'Marine Traffic Data (Live Map)', url: 'https://www.marinetraffic.com/' },
  { name: 'NCBFAA', url: 'https://www.ncbfaa.org/' },
  {
    name: 'Ocean Transportation Intermediaries Listing',
    url: 'https://www2.fmc.gov/oti/',
  },
  { name: 'On-Line Conversion', url: 'http://www.onlineconversion.com/' },
  {
    name: 'Percentage of Increase Calculator',
    url: 'https://www.marshu.com/articles/calculate-percentage-increase-decrease-percent-calculator.php',
  },
  { name: 'Phone Directory', url: 'https://www.whitepages.com/' },
  { name: 'PierPASS & Portcheck', url: 'https://www.pierpass-tmf.org/' },
  {
    name: 'Road Weight & Size Limitations by State',
    url: 'https://ops.fhwa.dot.gov/freight/policy/rpt_congress/truck_sw_laws/app_a.htm',
  },
  { name: 'Schedule B Search Engine', url: 'https://uscensus.prod.3ceonline.com/' },
  {
    name: 'SOLAS Container Weight Mandate',
    url: 'https://seashipping.com/forms/Solas%20Container%20Weight%20Mandate.pdf',
  },
  { name: 'Time and Date', url: 'https://www.timeanddate.com/' },
  { name: 'TT Club Mutual Insurance Limited', url: 'https://www.ttclub.com/' },
  { name: 'U.S. Customs and Border Protection', url: 'https://www.cbp.gov/' },
  {
    name: 'U.S. Flag Services',
    url: 'https://www.maritime.dot.gov/ports/cargo-preference/us-flag-services',
  },
  {
    name: 'U.S. Zip Code Lookup',
    url: 'https://tools.usps.com/go/ZipLookupAction!input.action',
  },
  {
    name: 'USPPI Responsibility Information Sheet',
    url: 'https://seashipping.com/forms/SSL%20USPPI%20Responsibility%20Information%20Sheet.pdf',
  },
  { name: 'Vehicle Identification Numbers', url: 'https://vehicleidentificationnumber.com/' },
  {
    name: 'Vessel Surveyors',
    url: 'https://natcargo.org/service-category/container-vessel-surveys/',
  },
  { name: 'VesselTracker.com', url: 'https://www.vesseltracker.com/' },
  { name: 'World Fact Book', url: 'https://www.cia.gov/the-world-factbook/' },
];

const schedulingCarriers = [
  {
    name: 'Atlantic Container Line',
    url: 'http://www.aclcargo.com/vesselSchedules.php',
  },
  { name: 'American President Lines (APL)', url: 'http://www.apl.com/ebusiness/schedules' },
  { name: 'ANL', url: 'https://www.anl.com.au' },
  {
    name: 'Bahri',
    url: 'https://www.bahri.sa/Online-Services/Voyage-Schedules.aspx',
  },
  { name: 'CMA CGM', url: 'http://www.cma-cgm.com/ebusiness/schedules' },
  {
    name: 'Cosco Container Lines Company',
    url: 'http://elines.coscoshipping.com/ebusiness/',
  },
  { name: 'Crowley', url: 'https://www.crowley.com/logistics/route/vocc-maps/' },
  { name: 'CU Lines', url: 'https://www.culines.com/en/site/ship_tracking' },
  {
    name: 'Evergreen Line',
    url: 'https://www.shipmentlink.com/tvs2/jsp/TVS2_InteractiveSchedule.jsp',
  },
  { name: 'Hapag-Lloyd', url: 'https://www.hapag-lloyd.com/en/home.html' },
  {
    name: 'Hyundai Merchant Marine',
    url: 'http://www.hmm21.com/cms/business/usa/index.jsp',
  },
  { name: 'Maersk Line', url: 'https://www.maersk.com/' },
  { name: 'Marfret Compagnie Maritime', url: 'https://www.marfret.com/en/search-result-2/' },
  {
    name: 'Matson',
    url: 'https://www.matson.com/matnav/schedules/interactive_vessel_schedule.html',
  },
  {
    name: 'Mediterranean Shipping Company (MSC)',
    url: 'https://www.msc.com/search-schedules',
  },
  {
    name: 'Ocean Network Express (O.N.E.)',
    url: 'https://ecomm.one-line.com/ecom/CUP_HOM_3001.do?sessLocale=en',
  },
  {
    name: 'Orient Overseas Container Line (OOCL)',
    url: 'https://www.oocl.com/eng/ourservices/eservices/sailingschedule/Pages/default.aspx',
  },
  {
    name: 'SeaLand',
    url: 'https://www.sealandmaersk.com/regional-selection?originalUrl=https%3a%2f%2fwww.sealandmaersk.com%2fschedules%2f',
  },
  { name: 'Seaboard Marine', url: 'https://www.seaboardmarine.com/' },
  {
    name: 'SM Line (Shipping Maestro)',
    url: 'https://esvc.smlines.com/smline/CUP_HOM_3001.do?sessLocale=en',
  },
  {
    name: 'Swire Shipping',
    url: 'https://www.swireshipping.com/findaschedule?searchBy=port',
  },
  { name: 'Wan Hai', url: 'https://www.wanhai.com/views/Main.xhtml' },
  { name: 'Yang Ming Line', url: 'https://www.yangming.com/en#' },
  {
    name: 'ZIM Integrated Shipping Services',
    url: 'https://www.zim.com/schedules/point-to-point',
  },
];

const trackingCarriers = [
  { name: 'Atlantic Container Line', url: 'http://www.aclcargo.com/trackCargo.php' },
  { name: 'American President Lines (APL)', url: 'http://www.apl.com/ebusiness/tracking' },
  { name: 'ANL', url: 'https://www.anl.com.au' },
  { name: 'Bahri', url: 'https://www.bahri.sa/Online-Services/Tracking.aspx' },
  { name: 'CMA CGM', url: 'http://www.cma-cgm.com/ebusiness/tracking' },
  {
    name: 'Cosco Container Lines Company',
    url: 'http://elines.coscoshipping.com/ebusiness/',
  },
  { name: 'Crowley', url: 'https://www.crowley.com/liner-shipment-tracking/' },
  { name: 'CSAV', url: 'https://www.hapag-lloyd.com/en/home.html' },
  { name: 'CU Lines', url: 'https://www.culines.com/en/site/bill' },
  {
    name: 'Evergreen Line',
    url: 'https://www.shipmentlink.com/servlet/TDB1_CargoTracking.do',
  },
  {
    name: 'Hamburg Süd',
    url: 'https://www.hamburgsud.com/en/ecommerce/visibility/track-and-trace/',
  },
  { name: 'Hapag-Lloyd', url: 'https://www.hapag-lloyd.com/en/home.html' },
  {
    name: 'Hyundai Merchant Marine',
    url: 'https://www.hmm21.com/cms/business/usa/trackTrace/trackTrace/index.jsp',
  },
  { name: 'Maersk Line', url: 'https://www.maersk.com/' },
  {
    name: 'Marfret Compagnie Maritime',
    url: 'https://www.marfret.fr/en/container-tracking/',
  },
  { name: 'Matson', url: 'https://www.matson.com/matnav/index.html' },
  {
    name: 'Mediterranean Shipping Company (MSC)',
    url: 'https://www.msc.com/track-a-shipment',
  },
  {
    name: 'Ocean Network Express (O.N.E.)',
    url: 'https://ecomm.one-line.com/ecom/CUP_HOM_3301.do?sessLocale=en',
  },
  {
    name: 'Orient Overseas Container Line (OOCL)',
    url: 'https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx',
  },
  { name: 'Safmarine (Maersk)', url: 'https://www.maersk.com/' },
  {
    name: 'SeaLand',
    url: 'https://www.sealandmaersk.com/regional-selection?originalUrl=https%3a%2f%2fwww.sealandmaersk.com%2ftracking%2f',
  },
  { name: 'Seaboard Marine', url: 'https://www.seaboardmarine.com/' },
  {
    name: 'SM Line (Shipping Maestro)',
    url: 'https://esvc.smlines.com/smline/CUP_HOM_3301.do?sessLocale=en',
  },
  {
    name: 'Swire Shipping (Polynesia Line)',
    url: 'https://www.swireshipping.com/information/info-pages/our-solutions/ocean-services/ply/',
  },
  { name: 'Wan Hai', url: 'https://www.wanhai.com/views/Main.xhtml' },
  {
    name: 'Yang Ming Line',
    url: 'https://www.yangming.com/e-service/track_trace/track_trace_cargo_tracking.aspx',
  },
  {
    name: 'ZIM Integrated Shipping Services',
    url: 'https://www.zim.com/tools/track-a-shipment',
  },
];

export default function ResourcesPage() {
  return (
    <main id="main" role="main" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The SSL Research Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive resources offering forms, scheduling, tracking, and industry
            tools for ocean transportation professionals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-primary" />
                Download Forms & Valuable Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Interactive PDF forms optimized for Adobe Acrobat, covering
                import/export documentation, regulatory compliance, SSL-specific
                agreements and policies, specialized services, and reference guides.
              </p>
              <Accordion type="single" collapsible className="w-full" suppressHydrationWarning>
                <AccordionItem value="forms">
                  <AccordionTrigger>
                    View All {forms.length} Available Forms
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {forms.map((form) => (
                        <li key={form.name}>
                          <a
                            href={`https://seashipping.com${form.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Download className="w-4 h-4" />
                            {form.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Wrench className="w-6 h-6 text-primary" />
                Industry Tool Box
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Over 65 external resources organized by function including trade
                databases, government agencies, carrier information, logistics
                utilities, and security programs.
              </p>
              <Accordion type="single" collapsible className="w-full" suppressHydrationWarning>
                <AccordionItem value="tools">
                  <AccordionTrigger>
                    View All {industryTools.length} Industry Tools
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {industryTools.map((tool) => (
                        <li key={tool.name}>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            <span className="break-words">{tool.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-6 h-6 text-primary" />
                  Contract Carrier Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {schedulingCarriers.length} major shipping lines with direct schedule
                  links. Good idea is to know your carrier and container number.
                </p>
                <Accordion type="single" collapsible className="w-full" suppressHydrationWarning>
                  <AccordionItem value="scheduling">
                    <AccordionTrigger>
                      View All Carrier Schedules
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {schedulingCarriers.map((carrier) => (
                          <li key={carrier.name}>
                            <a
                              href={carrier.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              {carrier.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                  Cargo Track & Trace
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tracking portals for {trackingCarriers.length} international carriers
                  serving U.S. ports and global routes.
                </p>
                <Accordion type="single" collapsible className="w-full" suppressHydrationWarning>
                  <AccordionItem value="tracking">
                    <AccordionTrigger>
                      View All Tracking Portals
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {trackingCarriers.map((carrier) => (
                          <li key={carrier.name}>
                            <a
                              href={carrier.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                              {carrier.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Company Credentials</h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
                  <div>
                    <strong>OTI#:</strong> 010787
                  </div>
                  <div>
                    <strong>SCAC Code:</strong> AAGP
                  </div>
                  <div>
                    <strong>Certification:</strong> C-TPAT Certified
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
