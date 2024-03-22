import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const MAIL_KEY = "emails";

export const mailService = {
  query,
  getById,
  get,
  remove,
  save,
  createEmails,
  updateEmail,
  sendEmail
};

createEmails();

async function query({ txt, status, isRead }) {
  let emails = await storageService.query(MAIL_KEY);

  if (txt) {
    emails = emails.filter(
      (email) =>
        email.subject.toLowerCase().includes(txt.toLowerCase()) ||
        email.body.toLowerCase().includes(txt.toLowerCase())
    );
  }

  if (isRead) {
    emails = emails.filter((email) => email.isread === true);
  }
  if (status) {
    switch (status) {
      case "inbox":
        emails = emails.filter(
          (email) => email.to === "user@appsus.com" && email.removedAt === false
        );
        break;
      case "star":
        emails = emails.filter((m) => m.isStarred === true && m.removedAt === false);
        break;
      case "trash":
        emails = emails.filter((m) => m.removedAt === true);
        break;
        case "sent":
          emails = emails.filter((m) => m.from === "" && m.removedAt === false);
          break;
    }
  }

  return emails;
}

async function getById(emailId) {
  let emails = await storageService.query(MAIL_KEY);

  let mail = emails.find((el) => el.id === emailId);

  return mail;
}

async function updateEmail(email) {
  return await storageService.put(MAIL_KEY, email);
}

function get(emailId) {
  return storageService.get(MAIL_KEY, emailId).then((email) => {
    email = _setNextPrevemailId(email);
    return email;
  });
}

function remove(emailId) {
  return storageService.remove(MAIL_KEY, emailId);
}

function save(email) {
  if (email.id) {
    return storageService.put(MAIL_KEY, email);
  } else {
    return storageService.post(MAIL_KEY, email);
  }
}

async function createEmails() {
  let emails = utilService.loadFromStorage(MAIL_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: false,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Vacation",
        body: "price for tickets",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930598,
        removedAt: false,
        from: "daniel@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "salary",
        body: "raise value",
        isRead: false,
        isStarred: false,
        sentAt: 15511339305,
        removedAt: false,
        from: "fabi@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e104",
        subject: "price of food",
        body: "raise of value",
        isRead: false,
        isStarred: false,
        sentAt: 15511339,
        removedAt: false,
        from: "fab@momo.com",
        to: "user@appsus.com",
      },
    ];

    // await mailService.save(emails)
    utilService.saveToStorage(MAIL_KEY, emails);
  }
}


async function sendEmail(data) {

  let emails = utilService.loadFromStorage(MAIL_KEY);
      data.id =(Math.round( Math.random() * (150 - 1) + 1)).toString();;
      data.from = ""
      emails = [...emails,data]
      data.sentAt = Date.now();
      data.removedAt= false;
    utilService.saveToStorage(MAIL_KEY, emails);
  
}

// function getEmptyCar(vendor = '', maxSpeed = '') {
//     return { vendor, maxSpeed }
// }

// function getDefaultFilter(filterBy = { txt: '', minSpeed: 0 }) {
//     return { txt: filterBy.txt, minSpeed: filterBy.minSpeed }
// }

// function _createCars() {
//     let cars = utilService.loadFromStorage(CAR_KEY)
//     if (!cars || !cars.length) {
//         cars = []
//         const vendors = ['audu', 'fiak', 'subali', 'mitsu']
//         for (let i = 0; i < 6; i++) {
//             const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
//             cars.push(_createCar(vendor, utilService.getRandomIntInclusive(80, 300)))
//         }
//         utilService.saveToStorage(CAR_KEY, cars)
//     }
// }

// function _createCar(vendor, maxSpeed = 250) {
//     const car = getEmptyCar(vendor, maxSpeed)
//     car.id = utilService.makeId()
//     return car
// }
