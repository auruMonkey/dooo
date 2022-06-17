export const DUMMY_SERVICES = [
  {
    id: "allbusinesses",
    name: "All Businesses",
  },
  {
    id: "spa",
    name: "Mobile Spa",
    image: require("../icons/lotus.png"),
  },
  {
    id: "barbersalon",
    name: "Mobile Barber",
    image: require("../icons/hair-brush.png"),
  },
  {
    id: "grooming",
    name: "Mobile Pet Grooming",
    image: require("../icons/dogheart.png"),
  },
  {
    id: "cardetails",
    name: "Mobile Vehicle Detail",
    image: require("../icons/car.png"),
  },
  {
    id: "health",
    name: "Mobile Health",
    image: require("../icons/hearthealth.png"),
  },
  {
    id: "gym",
    name: "Mobile Gym",
    image: require("../icons/deadlift.png"),
  },
  {
    id: "entertainment",
    name: "Mobile Entertainment",
    image: require("../icons/gamecontroller.png"),
  },
]
export const DUMMY_SERVICES_LINE = [
  {
    id: "patcare",
    name: "Pet Care",
    image: require("../icons/dogheart.png"),
  },
  {
    id: "vehicledetail",
    name: "Vehicle Detail",
    image: require("../icons/car.png"),
  },
  {
    id: "health",
    name: "Health",
    image: require("../icons/hearthealth.png"),
  },
  {
    id: "entertainment",
    name: "Entertainment",
    image: require("../icons/gamecontroller.png"),
  },
  {
    id: "barbersalon",
    name: "Salon/Barber",
    image: require("../icons/hair-brush.png"),
  },
  {
    id: "gym",
    name: "Fitness",
    image: require("../icons/deadlift.png"),
  },
]

export const DUMMY_BUSSINESS = [
  {
    id: 1,
    businessName: "Health Mobile Suite",
    location: [
      {
        id: 1,
        address: "96 County Rd #511 Corinth, MS, 38834",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],
    category: "health",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    services: [
      {
        id: 1,
        name: "basic check",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle check",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance check",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 15,
    insured: "yes",
    carouselImage: [
      {
        id: 1,
        path: "https://res.cloudinary.com/deveke/image/upload/v1648846558/xjmggjpdgzjqlvvyvcc1.jpg",
      },
      {
        id: 2,
        path: "https://www.scnsoft.com/blog-pictures/healthcare/mobile_health-01.png",
      },
    ],
    rating: 5,
    avatar:
      "https://res.cloudinary.com/deveke/image/upload/v1648846558/xjmggjpdgzjqlvvyvcc1.jpg",
  },
  // fdsfsd
  {
    id: 2,
    businessName: "Health Mobile Suite 2",
    location: [
      {
        id: 1,
        address: "772 S Chambers Rd Aurora, CO, 80017",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],
    category: "health",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    rating: 4,
    services: [
      {
        id: 1,
        name: "basic check",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle check",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance check",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 10,
    insured: "yes",
    avatar:
      "https://res.cloudinary.com/deveke/image/upload/v1649876725/dlripoabixhhkimzy0gh.png",
  },
  {
    id: 3,
    businessName: "Suite 59 Mobile Barber's Service",
    location: [
      {
        id: 1,
        address: "8416 SE Boxwood Ln Hobe Sound, FL, 33455",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],
    category: "barbersalon",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    rating: 3.5,
    services: [
      {
        id: 1,
        name: "basic style",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle style",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance style",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 15,
    insured: "yes",
    avatar:
      "https://www.siouxfalls.business/wp-content/uploads/2021/05/barber-02-e1621615870301.jpg",
  },
  {
    id: 4,
    businessName: "TRIM-IT",
    location: [
      {
        id: 1,
        address: "Rogers Rd Folkston, GA, 31537",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],
    category: "barbersalon",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    rating: 5,
    services: [
      {
        id: 1,
        name: "basic style",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle style",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance style",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 15,
    insured: "yes",
    avatar:
      "https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/04/17/18/trimit1604.jpg?width=1200",
  },
  {
    id: 5,
    businessName: "Grooming Pensilvania",
    location: [
      {
        id: 1,
        address: "Rogers Rd Folkston, GA, 31537",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],

    category: "grooming",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    rating: 4,
    services: [
      {
        id: 1,
        name: "basic grooming",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle grooming",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance grooming",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 15,
    insured: "yes",
    avatar:
      "https://www.mobilepetgroomingspapeninsula.com/sites/default/files/capavan.jpg",
  },
  {
    id: 6,
    businessName: "Waggingtails",
    location: [
      {
        id: 1,
        address: "545 Millstone Run Spencer, WV, 25276",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [5, 6],
        },
        rating: 5,
      },
      {
        id: 2,
        address: "2020 Church Ave, Brooklyn, NY 11226, USA",
        businessHours: {
          open: [9, 0, 1],
          close: [5, 0, 2],
          lunch: {
            at: [12, 0, 1],
            to: [12, 30, 1],
          },
          off: [1, 0],
        },
        rating: 4,
      },
    ],

    category: "grooming",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rutrum ante et faucibus aliquet. Phasellus non malesuada erat. Curabitur vitae nibh non tellus mollis hendrerit nec vitae ipsum. Vivamus commodo fermentum ex, ut volutpat mauris ornare id. Ut turpis libero, venenatis a pretium ut, blandit ultricies dolor. Vivamus in orci vitae lacus eleifend viverra ut id magna. Fusce feugiat felis in lacus facilisis laoreet. Ut gravida erat a nunc ullamcorper fermentum. Praesent porttitor turpis urna, sed ultricies mauris finibus ut. Mauris ut dignissim quam, ac pellentesque tellus. Aliquam mi est, sollicitudin in turpis sed, efficitur suscipit velit. Vivamus vulputate fermentum justo, non tincidunt augue. Donec auctor massa sed dictum semper./n Nullam pulvinar, mi ut pretium semper, augue ante pharetra risus, convallis vulputate lorem nulla et sapien. Nunc ac velit eros. Suspendisse non justo luctus, auctor sapien id, cursus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat ex enim, ut efficitur orci sollicitudin vitae. Suspendisse dapibus, tellus eu varius tincidunt, tellus ex accumsan odio, et aliquam libero velit nec arcu. Donec nec diam sed ipsum consequat posuere et in elit. Donec molestie quam laoreet, ultrices massa luctus, elementum risus. Proin efficitur in tellus eu accumsan. Mauris blandit ultrices tortor id hendrerit. Integer mattis enim id lorem efficitur, non feugiat mi auctor. Phasellus pharetra eget eros at vulputate.",
    rating: 5,
    services: [
      {
        id: 1,
        name: "basic grooming",
        price: 5.4,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 2,
        name: "middle grooming",
        price: 10.4,
        duration: 60,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
      {
        id: 3,
        name: "advance grooming",
        price: 25.4,
        duration: 90,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus consectetur vulputate at condimentum. In tortor arcu, sem dolor fermentum risus, integer condimentum in. Sit ac volutpat augue neque, etiam lorem. Habitant quis ullamcorper sit odio a dictum.",
      },
    ],
    licenseNumber: 1313213213,
    experience: 15,
    insured: "yes",
    avatar:
      "https://www.waggingtails.com/design/pages/mobile-grooming/mobile-grooming.jpg",
  },
]
