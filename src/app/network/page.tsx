import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { REGULATORY_INFO } from '@/lib/constants';
import Image from 'next/image';
import { MapPin, Phone, Printer, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Global Network | Worldwide Shipping Partners',
  description:
    'Sea Shipping Line\'s global network of offices and partners. Direct access to experienced staff across 8 U.S. offices and 50+ countries worldwide.',
};

// U.S. Domestic Offices Data
const domesticOffices = [
  {
    city: 'Oakland',
    state: 'California',
    address: '520 3rd Street, Suite 207',
    cityState: 'Oakland, CA 94607',
    phone: '+1 (510) 639-7447',
    fax: '+1 (510) 663-0104',
    emails: {
      exports: 'oak.customerservice@seashipping.com',
      imports: 'imports@seashipping.com',
      documents: 'oak.docs@seashipping.com',
    },
    staff: [
      { name: 'Frank Rosenberg', title: 'President' },
      { name: 'Sandy Di Caprio', title: 'Sales Manager' },
      { name: 'Diana Arroyo', title: 'Customer Service' },
      { name: 'Luz Carrillo', title: 'Customer Service' },
      { name: 'Nona Gallardo', title: 'Customer Service' },
      { name: 'Adrian Morales', title: 'Customer Service' },
      { name: 'Guadalupe Saucedo', title: 'Customer Service' },
    ],
  },
  {
    city: 'Red Bank',
    state: 'New Jersey',
    address: '114 Maple Avenue',
    cityState: 'Red Bank, NJ 07701',
    phone: '+1 (732) 530-2085',
    fax: '+1 (732) 530-2071 | +1 (732) 758-6037',
    email: 'sslnj@seashippingna.com',
    staff: [
      { name: 'Fred Morgenthaler', title: 'President' },
      { name: 'Maggie Paukovits', title: 'Contract Manager' },
    ],
  },
  {
    city: 'Atlanta',
    state: 'Georgia',
    address: '702 Abbey Court',
    cityState: 'Alpharetta, GA 30004',
    phone: '+1 (770) 663-3441',
    fax: '+1 (770) 663-3046',
    email: 'sslatlanta@seashippingna.com',
  },
  {
    city: 'Chicago',
    state: 'Illinois',
    address: '1807 W. Diehl Road, Suite 205',
    cityState: 'Naperville, IL 60563-1890',
    phone: '+1 (630) 393-9060',
    fax: '+1 (732) 530-2071',
    email: 'sslchi@seashippingna.com',
  },
  {
    city: 'Houston',
    state: 'Texas',
    address: '19221 I-45, Suite 350',
    cityState: 'Shenandoah, TX 77385',
    phone: '+1 (281) 877-0810',
    fax: '+1 (281) 877-0660',
    emails: {
      exports: 'hou.customerservice@seashipping.com',
      documents: 'hou.docs@seashipping.com',
    },
  },
  {
    city: 'Los Angeles',
    state: 'California',
    address: '2050 West 190th Street, Suite #201',
    cityState: 'Torrance, CA 90504',
    phone: '+1 (310) 767-1350',
    fax: '+1 (310) 767-1360 | (310) 767-1544',
    emails: {
      exports: 'lax.customerservice@seashipping.com',
      imports: 'lax.import@seashipping.com',
      documents: 'lax.docs@seashipping.com',
    },
    divisions: ['Special Commodities'],
  },
  {
    city: 'Miami',
    state: 'Florida',
    address: '250 South Central Blvd., Suite 102',
    cityState: 'Jupiter, FL 33458',
    phone: '+1 (561) 832-5665',
    fax: '+1 (561) 768-9151',
    email: 'sslmia@seashippingna.com',
  },
  {
    city: 'Seattle',
    state: 'Washington',
    address: '19125 North Creek Parkway, Suite 120',
    cityState: 'Bothell, WA 98011',
    phone: '+1 (206) 282-9559',
    fax: '+1 (206) 282-9741',
    emails: {
      exports: 'sea.customerservice@seashipping.com',
      documents: 'sea.docs@seashipping.com',
    },
  },
];

// International Partners Data by Region
const internationalPartners = {
  Africa: [
    {
      name: 'DFS Express Lines',
      countries: ['Kenya', 'Tanzania', 'Uganda'],
      locations: 'Mombasa, Dar-es-Salaam, Tanga, Zanzibar, Kampala',
      website: 'https://www.dawilfreight.co.ke',
      flag: 'ken_flag.gif',
    },
    {
      name: 'Haul and All Agencies (PTY) LTD',
      countries: ['South Africa'],
      locations: 'Cape Town, Durban, Johannesburg, Port Elizabeth',
      website: 'https://hauler.co.za',
      flag: 'soa_flag.gif',
    },
  ],
  Asia: [
    {
      name: 'Full Well and Nisshin Logistics Co., Ltd.',
      countries: ['Cambodia'],
      locations: 'Phnom Penh',
      website: 'https://fullwell.biz',
      flag: 'cam_flag.gif',
    },
    {
      name: 'Collyer Logistics North China Limited',
      countries: ['China'],
      locations: '30+ locations including Beijing, Shanghai, Guangzhou, Qingdao, Xiamen',
      website: 'https://www.collyerlogistics.com',
      flag: 'china_flag.gif',
    },
    {
      name: 'Collyer Logistics South China Limited',
      countries: ['Hong Kong SAR'],
      locations: 'Hong Kong',
      website: 'https://www.collyerlogistics.com',
      flag: 'hkg_flag.gif',
    },
    {
      name: 'Portever Shipping LTD',
      countries: ['China'],
      locations: 'Ningbo, Shanghai',
      website: 'https://us.portever.com',
      flag: 'china_flag.gif',
    },
    {
      name: 'PT Eurotrans Logistik Indonesia',
      countries: ['Indonesia'],
      locations: 'Belawan, Jakarta, Palembang, Panjang, Semarang, Surabaya',
      website: 'https://eurotransindo.com',
      flag: 'indo_flag.gif',
    },
    {
      name: 'PT Interkon Multi Logistik',
      countries: ['Indonesia'],
      locations: 'Belawan, Jakarta, Palembang, Panjang, Semarang, Surabaya',
      website: 'https://www.intercontgroup.com',
      flag: 'indo_flag.gif',
    },
    {
      name: 'Welgrow',
      countries: ['Indonesia'],
      locations: 'Belawan, Jakarta, Palembang, Panjang, Semarang, Surabaya',
      website: 'https://welgrow.co.id',
      flag: 'indo_flag.gif',
    },
    {
      name: 'Best Shipping Inc.',
      countries: ['Japan'],
      locations: '30+ ports including Tokyo, Yokohama, Osaka, Kobe, Nagoya',
      flag: 'jp_flag.gif',
    },
    {
      name: 'Kukbo Express',
      countries: ['Korea'],
      locations: 'Busan, Incheon, Kwangyang, Seoul',
      website: 'http://www.kbenl.co.kr',
      flag: 'sk_flag.gif',
    },
    {
      name: 'Eurotrans Charter SDN BHD',
      countries: ['Malaysia'],
      locations: '10 ports including Port Kelang, Penang, Kuching',
      website: 'https://www.eurotranscharter.com',
      flag: 'mal_flag.gif',
    },
    {
      name: 'LEO Global Logistics Public Co. Limited',
      countries: ['Myanmar', 'Thailand'],
      locations: 'Yangon (Myanmar); Bangkok, Laem Chabang, Lat Krabang, Songkhla (Thailand)',
      website: 'https://leogloballogistics.com/en',
      flag: 'myan_flag.gif',
    },
    {
      name: 'Famous Pacific Forwarding Phils., Inc.',
      countries: ['Philippines'],
      locations: 'Cebu, Davao, Manila, Subic Bay',
      website: 'https://www.fpsmnl.com.ph',
      flag: 'ph_flag.gif',
    },
    {
      name: 'Transworld Group Singapore',
      countries: ['Singapore'],
      locations: 'Singapore',
      website: 'https://tgsin.com',
      flag: 'sin_flag.gif',
    },
    {
      name: 'Green Master Int\'l Freight Services, Ltd.',
      countries: ['Taiwan'],
      locations: 'Kaohsiung, Keelung, Taichung, Taoyuan',
      website: 'http://www.gmi.com.tw',
      flag: 'twn_flag.gif',
    },
    {
      name: 'Everich Vietnam',
      countries: ['Vietnam'],
      locations: 'Cai Mep, Cat Lai, Da Nang, Hai Phong, Ho Chi Minh, Qui Nhon, Vung Tau',
      website: 'https://everichvietnam.com',
      flag: 'vn_flag.gif',
    },
  ],
  'Europe / U.K.': [
    {
      name: 'FCL Marine Agencies Belgium BVBA',
      countries: ['Belgium'],
      locations: 'Antwerp',
      website: 'https://www.fclmarine.com',
      flag: 'be_flag.gif',
    },
    {
      name: 'Hecksher',
      countries: ['Denmark', 'Finland', 'Norway'],
      locations: 'Aarhus, Copenhagen, Fredericia (Denmark); Hamina, Helsinki, Kemi, Kotka (Finland); 17 Norwegian ports',
      website: 'https://hecksher.com',
      flag: 'den_flag.gif',
    },
    {
      name: 'Pillet SAS',
      countries: ['France'],
      locations: 'Le Havre, Fos-sur-Mer, Le Verdon, Montoir',
      website: 'https://www.pillet.fr',
      flag: 'fr_flag.gif',
    },
    {
      name: 'FCL Marine Agencies GMBH',
      countries: ['Germany'],
      locations: 'Bremen, Bremerhaven, Dusseldorf, Hamburg',
      website: 'https://www.fclmarine.com',
      flag: 'ger_flag.gif',
    },
    {
      name: 'Jenkinson Logistics',
      countries: ['Ireland'],
      locations: 'Belfast, Cork, Dublin',
      website: 'https://www.jenkinson.ie',
      flag: 'ire_flag.gif',
    },
    {
      name: 'PrimeLogistics',
      countries: ['Lithuania'],
      locations: 'Klaipeda',
      website: 'https://prime-logistics.net',
      flag: 'lit_flag.gif',
    },
    {
      name: 'FCL Marine Agencies BV',
      countries: ['Netherlands'],
      locations: 'Amsterdam, Rotterdam',
      website: 'https://www.fclmarine.com',
      flag: 'nl_flag.gif',
    },
    {
      name: 'Scandinavian Shipping & Logistics AB',
      countries: ['Sweden'],
      locations: '8 Swedish ports',
      website: 'https://www.scandinavianshipping.se',
      flag: 'swe_flag.gif',
    },
    {
      name: 'Transfreight AG',
      countries: ['Switzerland'],
      locations: 'Basel, Geneva, Zurich',
      website: 'https://www.transfreight.ch',
      flag: 'sw_flag.gif',
    },
    {
      name: 'Sinergy Cargo Management d.o.o.',
      countries: ['Slovenia'],
      locations: 'Koper, Ljubljana',
      website: 'https://sinergycargo.si',
      flag: 'slo_flag.gif',
    },
    {
      name: 'Uniexpress',
      countries: ['United Kingdom'],
      locations: '9 ports including Southampton, Liverpool, Felixstowe',
      website: 'https://uniexpress.co.uk',
      flag: 'uk_flag.gif',
    },
  ],
  'Indian Subcontinent': [
    {
      name: 'Traffic Tech Logistics Ltd.',
      countries: ['Bangladesh'],
      locations: 'Chittagong, Dhaka, Mongla',
      website: 'https://www.traffictech-bd.com',
      flag: 'ban_flag.gif',
    },
    {
      name: 'Transworld Global Logistics Solutions (India) PVT LTD',
      countries: ['India'],
      locations: '16 locations across India',
      website: 'https://www.tglsindia.com',
      flag: 'india_flag.gif',
    },
    {
      name: 'James Mackintosh & CO PVT LTD',
      countries: ['India'],
      locations: 'Mumbai',
      website: 'https://www.jamesmackintosh.com',
      flag: 'india_flag.gif',
    },
    {
      name: 'Logistics Solutions (PVT) LTD',
      countries: ['Pakistan'],
      locations: 'Karachi (3 locations)',
      website: 'https://gls.com.pk',
      flag: 'pak_flag.gif',
    },
    {
      name: 'Abanchy',
      countries: ['Sri Lanka'],
      locations: 'Colombo',
      website: 'https://www.abanchy.com',
      flag: 'sl_flag.gif',
    },
    {
      name: 'Globactiv Logistics',
      countries: ['Sri Lanka'],
      locations: 'Colombo',
      website: 'https://www.globactiv.lk',
      flag: 'sl_flag.gif',
    },
  ],
  'Latin America': [
    {
      name: 'Operinter',
      countries: ['Argentina', 'Peru', 'Spain'],
      locations: 'Buenos Aires, Rosario, Zarate (Argentina); Callao, Ilo, Matarani, Paita (Peru); 7 Spanish ports',
      website: 'https://www.operinter.com',
      flag: 'arg_flag.gif',
    },
    {
      name: 'Excel Santos',
      countries: ['Brazil'],
      locations: '13 Brazilian ports',
      website: 'https://excelsantos.com.br',
      flag: 'br_flag.gif',
    },
    {
      name: 'Sea Shipping Line (Chile) SPA',
      countries: ['Chile'],
      locations: '9 Chilean ports',
      website: 'https://www.seashipping.cl',
      flag: 'ch_flag.gif',
    },
    {
      name: 'Sea Cargo Logistics',
      countries: ['Colombia'],
      locations: '5 Colombian ports',
      website: 'https://seacargo.com/en/',
      flag: 'col_flag.gif',
    },
    {
      name: 'Medinter S.A.',
      countries: ['Costa Rica'],
      locations: '4 Costa Rican ports',
      website: 'https://medintercr.com',
      flag: 'cr_flag.gif',
    },
    {
      name: 'ModalTrade Global Logistics',
      countries: ['Ecuador'],
      locations: 'Esmeraldas, Guayaquil',
      website: 'https://modaltrade.com.ec',
      flag: 'ecu_flag.gif',
    },
    {
      name: 'CargoMania',
      countries: ['El Salvador'],
      locations: 'Acajutla, San Salvador',
      website: 'https://escargomania.com',
      flag: 'els_flag.gif',
    },
    {
      name: 'Atlapac S.A.',
      countries: ['Guatemala'],
      locations: '3 Guatemalan ports',
      website: 'https://atlapac.com.gt',
      flag: 'guat_flag.gif',
    },
    {
      name: 'Translogistics Honduras S.A.',
      countries: ['Honduras'],
      locations: '3 Honduran ports',
      flag: 'hon_flag.gif',
    },
    {
      name: 'Magnum de Nicaragua S.A.',
      countries: ['Nicaragua'],
      locations: 'Corinto, Managua',
      website: 'http://www.magnumdenicaragua.com',
      flag: 'nic_flag.gif',
    },
    {
      name: 'Cargo Services Panama S.A.',
      countries: ['Panama'],
      locations: '5 Panamanian ports',
      website: 'https://cargoservicesgroup.com/en',
      flag: 'pan_flag.gif',
    },
    {
      name: 'Intercontinental Shipping Limited (ICSL)',
      countries: ['Trinidad & Tobago'],
      locations: '2 ports',
      website: 'https://www.icsl.co.tt',
      flag: 'trin_flag.gif',
    },
    {
      name: 'Blademar Logistics',
      countries: ['Uruguay'],
      locations: 'Montevideo',
      website: 'http://www.blademar.com',
      flag: 'uru_flag.gif',
    },
    {
      name: 'TMA Aduana, C.A.',
      countries: ['Venezuela'],
      locations: '6 Venezuelan ports',
      website: 'http://www.tmaaduana.com',
      flag: 'vz_flag.gif',
    },
  ],
  Mediterranean: [
    {
      name: 'Ipsen Logistics',
      countries: ['Algeria', 'Morocco'],
      locations: '5 Algerian ports, 3 Moroccan ports',
      website: 'https://www.ipsenlogistics.com',
      flag: 'alg_flag.gif',
    },
    {
      name: 'Egyptian Freight Services',
      countries: ['Egypt'],
      locations: 'Alexandria, Damietta, Port Said',
      website: 'https://efsegypt.net',
      flag: 'egy_flag.gif',
    },
    {
      name: 'Shashati Freight Services',
      countries: ['Egypt'],
      locations: 'Alexandria, Damietta, Port Said',
      website: 'https://www.sfsgloballogistics.com',
      flag: 'egy_flag.gif',
    },
    {
      name: 'Aktis Shipping and Forwarding',
      countries: ['Greece'],
      locations: '4 Greek ports',
      website: 'https://www.aktis-hellas.gr',
      flag: 'gr_flag.gif',
    },
    {
      name: 'A & A The Int\'l Forwarding Centre Ltd',
      countries: ['Israel'],
      locations: 'Ashdod, Haifa',
      website: 'http://www.aa-the-ifc.com',
      flag: 'is_flag.gif',
    },
    {
      name: 'Sinergy Cargo',
      countries: ['Italy'],
      locations: '13 Italian ports',
      website: 'https://www.sinergycargo.com',
      flag: 'it_flag.gif',
    },
    {
      name: 'G – Freight Unipessoal, Lda.',
      countries: ['Portugal'],
      locations: '4 Portuguese ports',
      website: 'https://www.g-freight.pt',
      flag: 'pr_flag.gif',
    },
    {
      name: 'Easttrans',
      countries: ['Turkey'],
      locations: 'Istanbul',
      website: 'https://www.easttrans.com.tr',
      flag: 'tr_flag.gif',
    },
    {
      name: 'Rotamar Int\'l Shipping & Logistics',
      countries: ['Turkey'],
      locations: 'Izmir',
      website: 'http://rotamar.com/en',
      flag: 'tr_flag.gif',
    },
  ],
  'Middle East': [
    {
      name: 'Navigators Shipping And Logistica L.L.C.',
      countries: ['Bahrain', 'Kuwait', 'Oman', 'Qatar', 'UAE'],
      locations: 'Multiple ports across Middle East',
      website: 'https://www.navigatorslogistica.com',
      flag: 'bah_flag.gif',
    },
    {
      name: 'Gulf Agency Company Jordan',
      countries: ['Jordan'],
      locations: 'Aqaba',
      website: 'https://www.gac.com',
      flag: 'jor_flag.gif',
    },
    {
      name: 'GIFCO-Lebanon',
      countries: ['Lebanon'],
      locations: 'Beirut',
      website: 'https://www.gifco.com.lb',
      flag: 'le_flag.gif',
    },
    {
      name: 'Blueways Int\'l Shipping & Logistics',
      countries: ['Saudi Arabia'],
      locations: '3 Saudi ports',
      website: 'https://www.bluewaysintl.com',
      flag: 'sa_flag.gif',
    },
    {
      name: 'Logistica L.L.C.',
      countries: ['UAE'],
      locations: 'Dubai, Jebel Ali',
      website: 'https://www.logistica-group.com/ae/en',
      flag: 'uae_flag.gif',
    },
    {
      name: 'Reliance Freight Services',
      countries: ['UAE'],
      locations: 'Multiple UAE ports',
      website: 'https://reliancefreightsystems.com',
      flag: 'uae_flag.gif',
    },
  ],
  Oceania: [
    {
      name: 'Mondiale VGL Pty Ltd',
      countries: ['Australia'],
      locations: '4 Australian ports',
      website: 'https://mondialevgl.com',
      flag: 'au_flag.gif',
    },
    {
      name: 'Famous Pacific Shipping (WA) Pty Ltd',
      countries: ['Australia'],
      locations: '4 Australian ports',
      website: 'https://www.famous.com.au',
      flag: 'au_flag.gif',
    },
    {
      name: 'Colless Young Pty Ltd',
      countries: ['Australia'],
      locations: 'Brisbane',
      website: 'https://www.collessyoung.com.au',
      flag: 'au_flag.gif',
    },
    {
      name: 'Pacific Agencies Fiji',
      countries: ['Fiji Islands'],
      locations: '2 Fijian ports',
      flag: 'fiji_flag.gif',
    },
    {
      name: 'LTN Agency',
      countries: ['New Caledonia', 'Tahiti'],
      locations: 'Noumea, Papeete',
      website: 'https://www.ltn.nc',
      flag: 'newcal_flag.gif',
    },
    {
      name: '360 Logistics',
      countries: ['New Zealand'],
      locations: '8 New Zealand ports',
      website: 'https://www.360lg.co.nz',
      flag: 'nz_flag.gif',
    },
  ],
};

export default function NetworkPage() {
  return (
    <main id="main" role="main" className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">GLOBAL NETWORK</h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
            Our people are our <em className="font-semibold not-italic">greatest asset</em> and
            always strive to provide an exceptional client experience.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Speak directly to experienced staff, not automated systems - a Sea Shipping Line
            standard.
          </p>
        </div>

        {/* Credentials Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-16">
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="font-semibold">C-TPAT Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">SCAC:</span>
              <span>{REGULATORY_INFO.scac}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">OTI#:</span>
              <span>{REGULATORY_INFO.oti}</span>
            </div>
          </div>
        </div>

        {/* U.S. Domestic Offices */}
        <section className="mb-16" aria-labelledby="us-offices-heading">
          <h2 id="us-offices-heading" className="text-3xl font-bold mb-8 text-center">
            U.S. Domestic Offices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domesticOffices.map((office) => (
              <Card key={`${office.city}-${office.state}`} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Image
                      src="/images/network/flags/us_flag.png"
                      alt="USA"
                      width={32}
                      height={24}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        {office.city}, {office.state}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {office.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" aria-hidden="true" />
                      <div className="text-sm">
                        <div>{office.address}</div>
                        <div>{office.cityState}</div>
                      </div>
                    </div>
                  )}
                  {office.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <a href={`tel:${office.phone}`} className="text-sm hover:text-blue-600">
                        {office.phone}
                      </a>
                    </div>
                  )}
                  {office.fax && (
                    <div className="flex items-center gap-2">
                      <Printer className="h-4 w-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">{office.fax}</span>
                    </div>
                  )}
                  {office.email && (
                    <div className="text-sm">
                      <span className="font-medium block mb-1">Email:</span>
                      <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline break-all">
                        {office.email}
                      </a>
                    </div>
                  )}
                  {office.emails && (
                    <div className="text-sm">
                      <span className="font-medium block mb-1">Emails:</span>
                      <div className="space-y-1">
                        {office.emails.exports && (
                          <div>
                            <span className="text-gray-600">Exports: </span>
                            <a href={`mailto:${office.emails.exports}`} className="text-blue-600 hover:underline break-all">
                              {office.emails.exports}
                            </a>
                          </div>
                        )}
                        {office.emails.imports && (
                          <div>
                            <span className="text-gray-600">Imports: </span>
                            <a href={`mailto:${office.emails.imports}`} className="text-blue-600 hover:underline break-all">
                              {office.emails.imports}
                            </a>
                          </div>
                        )}
                        {office.emails.documents && (
                          <div>
                            <span className="text-gray-600">Documents: </span>
                            <a href={`mailto:${office.emails.documents}`} className="text-blue-600 hover:underline break-all">
                              {office.emails.documents}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {office.staff && office.staff.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                      <h3 className="text-sm font-semibold mb-2">Staff</h3>
                      <ul className="space-y-1 text-sm">
                        {office.staff.map((member) => (
                          <li key={member.name}>
                            <span className="font-medium">{member.name}</span>
                            <span className="text-gray-600"> - {member.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {office.divisions && office.divisions.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                      <h3 className="text-sm font-semibold mb-2">Divisions</h3>
                      <ul className="space-y-1 text-sm">
                        {office.divisions.map((division) => (
                          <li key={division}>{division}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* International Network */}
        <section aria-labelledby="international-network-heading">
          <h2 id="international-network-heading" className="text-3xl font-bold mb-8 text-center">
            International Network Partners
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Our trusted network of logistics partners spans 50+ countries across eight global
            regions, ensuring reliable service worldwide.
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {Object.entries(internationalPartners).map(([region, partners]) => (
              <AccordionItem key={region} value={region} className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{region}</h3>
                    <span className="text-sm text-gray-500">({partners.length} partners)</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {partners.map((partner, index) => (
                      <div
                        key={`${partner.name}-${index}`}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <Image
                            src={`/images/network/flags/${partner.flag}`}
                            alt={partner.countries.join(', ')}
                            width={32}
                            height={24}
                            className="mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base mb-1 break-words">
                              {partner.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {partner.countries.join(', ')}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span className="text-gray-600 break-words">{partner.locations}</span>
                          </div>
                          {partner.website && (
                            <div className="flex items-start gap-2">
                              <Globe className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline break-all"
                              >
                                {partner.website.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact CTA */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 text-center" aria-labelledby="contact-cta-heading">
          <h2 id="contact-cta-heading" className="text-2xl font-bold mb-4">
            Ready to Ship with Our Global Network?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our experienced team to discuss your shipping needs and discover how our
            worldwide network can serve you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </main>
  );
}
