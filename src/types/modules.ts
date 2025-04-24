
export type LifeAreaKey = 
  | "professional" 
  | "health" 
  | "financial" 
  | "educational" 
  | "spiritual" 
  | "personal";

export interface LifeArea {
  key: LifeAreaKey;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export type LifeModule = 
  | "professional" 
  | "health" 
  | "financial" 
  | "educational" 
  | "spiritual" 
  | "personal";

export interface ModuleState {
  enabled: boolean;
  onboarded: boolean;
}

export interface ModulesData {
  [key: string]: ModuleState;
}

// Default module configuration
export const defaultModulesData: Record<LifeModule, ModuleState> = {
  professional: { enabled: true, onboarded: false },
  health: { enabled: false, onboarded: false },
  financial: { enabled: false, onboarded: false },
  educational: { enabled: false, onboarded: false },
  spiritual: { enabled: false, onboarded: false },
  personal: { enabled: false, onboarded: false },
};
