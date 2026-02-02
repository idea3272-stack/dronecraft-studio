import { motion } from "framer-motion";
import { MapPin, Mail, Sparkles, Users, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  const team = [
    {
      name: "Nontakon Noinart",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Pannathon Jamsawang",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Phirachat Tuamjui",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Tachaphon Kobthongsirichok",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Krittin Thongtem",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Thana Boonchu",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    },
  ];

  const stats = [
    { icon: Users, value: "6+", label: "ทีมนักพัฒนา" },
    { icon: Zap, value: "100%", label: "มุ่งมั่นพัฒนา" },
    { icon: Sparkles, value: "∞", label: "ความคิดสร้างสรรค์" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section with animated background */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">พบกับทีมของเรา</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              เกี่ยวกับ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary">
                SkyTech
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              พบกับทีมผู้พัฒนาของเราที่มุ่งมั่นสร้างสรรค์นวัตกรรม
              <br className="hidden md:block" />
              เพื่อตอบโจทย์ทุกความต้องการด้านเทคโนโลยีโดรน
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-4 md:p-6 text-center group hover:bg-primary/10 transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <div className="font-display text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              ทีม<span className="text-primary">ผู้บริหาร</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              ทีมงานที่มีความเชี่ยวชาญและมุ่งมั่นในการพัฒนาผลิตภัณฑ์คุณภาพ
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="glass rounded-3xl p-5 text-center transition-all duration-500 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20">
                  <div className="relative mx-auto mb-4">
                    {/* Glowing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                      style={{ transform: "scale(1.1)" }}
                    />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              ติดต่อ<span className="text-primary">เรา</span>
            </h2>
            <p className="text-muted-foreground">
              พร้อมให้บริการและตอบคำถามทุกข้อสงสัย
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-8 text-center group hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                ที่อยู่
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                304 หมู่ 8 ตำบลสามพราน
                <br />
                อำเภอสามพราน จังหวัดนครปฐม 73110
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-8 text-center group hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                อีเมล
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                04006@sukhon.ac.th
                <br />
                03146@sukhon.ac.th
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
