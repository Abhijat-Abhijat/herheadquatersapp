// account plan types
import {
  oldPremium,
  basic,
  premium,
  premiumPlus,
  allPlanList,
} from 'src/modules/payment/planTypes';
// product types
import { creditList } from 'src/modules/payment/productTypes';

export const createUpdateAccountButtonText = (plan, currentAccountType) => {
  const planType = plan.name;
  const planTitle = plan.title;

  if (currentAccountType === oldPremium.name) {
    if (planType === basic.name) {
      return `Downgrade to ${planTitle}`;
    }
    if (planType === premium.name) {
      return `Upgrade to new ${planTitle}`;
    }
    if (planType === premiumPlus.name) {
      return `Upgrade to ${planTitle}`;
    }
  }

  if (currentAccountType === basic.name) {
    if (planType === basic.name) {
      return `Current account type`;
    }

    return `Upgrade to ${planTitle}`;
  }

  if (currentAccountType === premium.name) {
    if (planType === basic.name) {
      return `Downgrade to ${planTitle}`;
    }

    if (planType === premium.name) {
      return `Current account type`;
    }

    if (planType === premiumPlus.name) {
      return `Upgrade to ${planTitle}`;
    }
  }

  if (currentAccountType === premiumPlus.name) {
    if (planType === premiumPlus.name) {
      return `Current account type`;
    }

    return `Downgrade to ${planTitle}`;
  }
};

export const getPlanByName = (name) => {
  return allPlanList.find((acc) => acc.name === name);
};

export const getCreditBySelectValue = (creditValue) => {
  return creditList.find((credit) => credit.selectValue === creditValue);
};
