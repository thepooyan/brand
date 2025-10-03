import { eq } from "drizzle-orm"
import fs from "fs"
import { db } from "./db"
import { blogsTable } from "./schema"

const blogs: Omit<typeof blogsTable.$inferInsert, "id">[] = [
  {
    slug: "شروع-برنامه-نویسی",
    date: new Date().toISOString(),
    title: "شروع برنامه‌نویسی با جاوااسکریپت",
    excerpt: "در این مقاله یاد می‌گیریم چگونه اولین قدم‌ها را در برنامه‌نویسی با جاوااسکریپت برداریم.",
    content: "جاوااسکریپت یکی از زبان‌های محبوب در توسعه وب است. اگر تازه‌کار هستید، بهتر است با مفاهیم پایه مثل متغیرها، حلقه‌ها و توابع شروع کنید...",
    readTime: 6,
    image: "",
    tags: ["برنامه‌نویسی", "جاوااسکریپت"],
    likeCount: 0
  },
  {
    slug: "راهنمای-ری‌اکت",
    date: new Date().toISOString(),
    title: "راهنمای مقدماتی ری‌اکت",
    excerpt: "اگر می‌خواهید اپلیکیشن‌های مدرن بسازید، ری‌اکت یکی از بهترین گزینه‌هاست.",
    content: "ری‌اکت یک کتابخانه‌ی قدرتمند برای ساخت رابط کاربری است. با استفاده از کامپوننت‌ها می‌توانید صفحات خود را به بخش‌های کوچک و قابل مدیریت تقسیم کنید...",
    readTime: 8,
    image: "",
    tags: ["ری‌اکت", "فرانت‌اند", "جاوااسکریپت"],
    likeCount: 0
  },
  {
    slug: "مدیریت-زمان",
    date: new Date().toISOString(),
    title: "چگونه در یادگیری برنامه‌نویسی زمان خود را مدیریت کنیم؟",
    excerpt: "یادگیری برنامه‌نویسی نیازمند مدیریت زمان و برنامه‌ریزی است.",
    content: "برای موفقیت در یادگیری برنامه‌نویسی، باید یک برنامه‌ی منظم داشته باشید. هر روز زمانی مشخص برای تمرین کدنویسی اختصاص دهید و اهداف کوتاه‌مدت برای خود تعیین کنید...",
    readTime: 5,
    image: "",
    tags: ["موفقیت", "مدیریت زمان", "یادگیری"],
    likeCount: 0
  }
]

async function seedBlogs() {
  await db.insert(blogsTable).values(blogs)
  console.log("۳ پست بلاگ با موفقیت اضافه شد")
}


// let c = fs.readFileSync("./src/db/test.md", "utf-8")

// await db.update(blogsTable).set({content:c}).where(eq(blogsTable.id,  3))
  
seedBlogs()

