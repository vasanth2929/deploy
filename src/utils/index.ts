import { isEmpty, omit } from "lodash";
import { AppMenu } from "../types/app-menu.type";

export const appsMenus: AppMenu = {
  Photos: [
    {
      label: "Jpeg Images",
    },
    {
      label: "PNG Images",
    },
    {
      label: "Terms of Service",
    },
    {
      label: "Privacy Policy",
    },
    {
      label: "Cookies Policy",
    },
    {
      label: "About Us",
    },
    {
      label: "Forum",
    },
  ],
  Vectors: [
    {
      label: "SVG",
    },
    {
      label: "EPS",
    },
    {
      label: "Terms of Service",
    },
    {
      label: "Privacy Policy",
    },
    {
      label: "Cookies Policy",
    },
    {
      label: "About Us",
    },
    {
      label: "Forum",
    },
  ],
  Videos: [
    {
      label: "SVG",
    },
    {
      label: "EPS",
    },
    {
      label: "Terms of Service",
    },
    {
      label: "Privacy Policy",
    },
    {
      label: "Cookies Policy",
    },
    {
      label: "About Us",
    },
    {
      label: "Forum",
    },
  ],
  Music: [
    {
      label: "SVG",
    },
    {
      label: "EPS",
    },
    {
      label: "Terms of Service",
    },
    {
      label: "Privacy Policy",
    },
    {
      label: "Cookies Policy",
    },
    {
      label: "About Us",
    },
    {
      label: "Forum",
    },
  ],
  SFX: [
    {
      label: "SVG",
    },
    {
      label: "EPS",
    },
    {
      label: "Terms of Service",
    },
    {
      label: "Privacy Policy",
    },
    {
      label: "Cookies Policy",
    },
    {
      label: "About Us",
    },
    {
      label: "Forum",
    },
  ],
  // "3D": [
  //   {
  //     label: "SVG",
  //   },
  //   {
  //     label: "EPS",
  //   },
  //   {
  //     label: "Terms of Service",
  //   },
  //   {
  //     label: "Privacy Policy",
  //   },
  //   {
  //     label: "Cookies Policy",
  //   },
  //   {
  //     label: "About Us",
  //   },
  //   {
  //     label: "Forum",
  //   },
  // ],
  // Icons: [
  //   {
  //     label: "SVG",
  //   },
  //   {
  //     label: "EPS",
  //   },
  //   {
  //     label: "Terms of Service",
  //   },
  //   {
  //     label: "Privacy Policy",
  //   },
  //   {
  //     label: "Cookies Policy",
  //   },
  //   {
  //     label: "About Us",
  //   },
  //   {
  //     label: "Forum",
  //   },
  // ],
  // Courses: [
  //   {
  //     label: "SVG",
  //   },
  //   {
  //     label: "EPS",
  //   },
  //   {
  //     label: "Terms of Service",
  //   },
  //   {
  //     label: "Privacy Policy",
  //   },
  //   {
  //     label: "Cookies Policy",
  //   },
  //   {
  //     label: "About Us",
  //   },
  //   {
  //     label: "Forum",
  //   },
  // ],
};

export const visibilityOptions = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
];

export const liscenceOptions = [
  {
    label: "All rights reserved",
    value: "All rights reserved",
  },
];

export const categoryOptions = [
  {
    label: "Art / Creative / Entertainment",
    value: "Art / Creative / Entertainment",
  },
  {
    label: "Autos / Vehicles",
    value: "Autos / Vehicles",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
  {
    label: "Education",
    value: "Education",
  },
  {
    label: "Film & Animation",
    value: "Film & Animation",
  },
  {
    label: "Finance / Money",
    value: "Finance / Money",
  },
  {
    label: "Gaming",
    value: "Gaming",
  },
  {
    label: "Health / Fitness",
    value: "Health / Fitness",
  },
  {
    label: "Lifestyle",
    value: "Lifestyle",
  },
  {
    label: "Nature",
    value: "Nature",
  },
  {
    label: "News / Politics",
    value: "News / Politics",
  },
  {
    label: "Nonprofits / Activism",
    value: "Nonprofits / Activism",
  },
  {
    label: "People / Relationship",
    value: "People / Relationship",
  },
  {
    label: "Pets / Animals",
    value: "Pets / Animals",
  },
  {
    label: "Sports",
    value: "Sports",
  },
  {
    label: "Science / Technology",
    value: "Science / Technology",
  },
  {
    label: "Travel / Events",
    value: "Travel / Events",
  }
];

const USER_KEY = "user";
export const setUser = (data: any, isLocal: boolean = false) => {
  if (isLocal) {
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  } else {
    sessionStorage.setItem(USER_KEY, JSON.stringify(data));
  }
};

export const getUser = () => {
  let data = sessionStorage.getItem(USER_KEY);
  if (data) return JSON.parse(data);
  else {
    data = localStorage.getItem(USER_KEY);
    if (data) return JSON.parse(data);
  }
};

export const removeUser = () => {
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getFileExtension = (str: string): string => {
  const arr = str.split(".");
  return arr[arr.length - 1].toLowerCase();
};

export const excludeEmpty = (
  data: Record<string, any>,
  blacklistedProps?: Array<string>
) => {
  const tempData = omit(data, blacklistedProps);
  const dataToReturn = {};
  Object.keys(tempData).map((key) => {
    if (!isEmpty(tempData[key])) {
      dataToReturn[key] = tempData[key];
    }
  });

  return dataToReturn;
};

export const getDateMap = (data) => {
  const dataMap = new Map();
  data.forEach((t) => {
    dataMap.set(t.date, t.count);
  });

  return dataMap;
};