import React, { useState } from 'react';
import { Plane } from 'lucide-react';

export const OFFICIAL_LOGO_URL = '/assets/aistudio/MULTFLIGHT_2deed2f4.webp';

export const REAL_IMAGES = {
  // Original Hero Slider Images (preserved so the Hero remains exactly as is)
  executiveAviation: '/src/assets/images/hero_executive_aviation_1794857311575.jpg',
  groundHandling: '/src/assets/images/ground_handling_ramp_1794857313278.jpg',
  offshoreOperations: '/src/assets/images/offshore_platform_helicopter_1794857314936.jpg',
  maritimeOperations: '/src/assets/images/maritime_supply_vessel_1794857315487.jpg',
  inshoreOperations: '/src/assets/images/inshore_port_logistics_1794857318024.jpg',
  aviationHangar: '/src/assets/images/aviation_hangar_camo_1794857318020.jpg',

  // Angolan Operational Reality Photographs (with distinct Ground Handling Services & Supervision)
  angolaExecutiveAviation: '/src/assets/images/angola_executive_aviation_1794858135755.jpg',
  angolaGroundHandlingServices: '/src/assets/images/angola_ground_handling_services_1794858132369.jpg',
  angolaGroundHandlingSupervision: '/src/assets/images/angola_ground_handling_supervision_1794858134874.jpg',
  angolaOffshoreOperations: '/src/assets/images/angola_offshore_operations_1794858137078.jpg',
  angolaInshoreOperations: '/src/assets/images/angola_inshore_operations_1794858138619.jpg',
  angolaMaritimeOperations: '/src/assets/images/angola_maritime_operations_1794858140107.jpg',
  angolaAviationHangar: '/src/assets/images/angola_aviation_hangar_camo_1794858141406.jpg',
} as const;

interface LogoProps {
  variant?: 'light' | 'dark' | 'adaptive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Renders the official Multiflight Angola logo (/assets/aistudio/MULTFLIGHT_2deed2f4.webp)
 * preserving its exact composition, proportions, and colors (#1769AA blue, #D71920 red, #FFFFFF white).
 */
export const MultiflightLogo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses =
    size === 'lg'
      ? 'h-14 sm:h-16 px-3.5 py-1.5'
      : size === 'sm'
        ? 'h-10 px-2.5 py-1'
        : 'h-12 sm:h-13 px-3 py-1';

  return (
    <div
      className={`inline-flex items-center justify-center bg-white rounded-lg shadow-xs border border-slate-200/80 select-none shrink-0 ${sizeClasses} ${className}`}
    >
      {!imgError ? (
        <img
          src={OFFICIAL_LOGO_URL}
          alt="MULTIFLIGHT, LDA (fazemos o tempo) - Logótipo Oficial"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-auto object-contain"
        />
      ) : (
        <div className="flex items-center gap-2 px-2">
          <Plane className="w-5 h-5 text-[#1769AA]" />
          <span className="text-sm font-extrabold tracking-tight text-[#1769AA]">
            MULTIFLIGHT <span className="text-[#D71920]">ANGOLA</span>
          </span>
        </div>
      )}
    </div>
  );
};

interface SceneProps {
  scene: string;
  className?: string;
  title?: string;
  objectPosition?: string;
}

export function getPhotoForScene(scene: string): { src: string; position: string } {
  switch (scene) {
    case 'ground-handling':
    case 'ramp-handling-supervision':
      return {
        src: REAL_IMAGES.angolaGroundHandlingServices,
        position: 'center center',
      };
    case 'supervision':
    case 'airport-dispatch-control':
      return {
        src: REAL_IMAGES.angolaGroundHandlingSupervision,
        position: 'center top',
      };
    case 'offshore':
    case 'offshore-platform-heli':
      return {
        src: REAL_IMAGES.angolaOffshoreOperations,
        position: 'center center',
      };
    case 'inshore':
    case 'inshore-coastal-terminal':
      return {
        src: REAL_IMAGES.angolaInshoreOperations,
        position: 'center center',
      };
    case 'maritime':
    case 'maritime-supply-vessel':
      return {
        src: REAL_IMAGES.angolaMaritimeOperations,
        position: 'center center',
      };
    case 'aviation':
    case 'rotary-wing-fleet':
    case 'corporate-hangar-facility':
      return {
        src: REAL_IMAGES.angolaAviationHangar,
        position: 'center center',
      };
    case 'executive-jet-apron':
    default:
      return {
        src: REAL_IMAGES.angolaExecutiveAviation,
        position: 'center center',
      };
  }
}

/**
 * High-resolution real photographic operational component with resilient fallback.
 */
export const OperationalScene: React.FC<SceneProps> = ({
  scene,
  className = '',
  title,
  objectPosition,
}) => {
  const [failed, setFailed] = useState(false);
  const photo = getPhotoForScene(scene);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#0D3E66] via-[#1769AA] to-[#114B7A] ${className}`}
    >
      {!failed ? (
        <img
          src={photo.src}
          alt={title || 'Multiflight Angola Operational Photography'}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectPosition: objectPosition || photo.position }}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/90">
          <Plane className="w-10 h-10 mb-2 text-white/80" />
          <span className="text-xs font-bold tracking-wider uppercase">
            {title || 'MULTIFLIGHT ANGOLA'}
          </span>
        </div>
      )}
    </div>
  );
};
