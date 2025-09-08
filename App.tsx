import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

const App: React.FC = () => {
  const myPhoto: ImageSourcePropType = require('./assets/me-.png');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Card */}
        <View style={[styles.card, styles.profileCard]}>
          <View style={styles.photoWrapper}>
            <Image source={myPhoto} style={styles.photo} resizeMode="cover" />
          </View>

          <View style={styles.profileTextBlock}>
            <Text style={styles.name}>Fajrikun Makalalag</Text>
            <Text style={styles.role}>
              Mahasiswa Informatika — Universitas Klabat
            </Text>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Umur</Text>
              <Text style={styles.infoValue}>20 Tahun</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tinggi</Text>
              <Text style={styles.infoValue}>177 cm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alamat</Text>
              <Text style={styles.infoValue}>Airmadidi, Minahasa Utara</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>fajrikunmakalalag@gmail.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telepon</Text>
              <Text style={styles.infoValue}>+62 8820-190-8677</Text>
            </View>
          </View>
        </View>

        {/* Education */}
        <Section title="Pendidikan">
          <Card>
            <Text style={styles.itemTitle}>
              S1 Informatika — Universitas Klabat
            </Text>
            <Text style={styles.itemSubtitle}>2021 — Sekarang</Text>
            <Text style={styles.itemDesc}>
              Fokus pada pengembangan aplikasi web, pembelajaran mesin, dan
              rekayasa perangkat lunak.
            </Text>
          </Card>
        </Section>

        {/* Projects */}
        <Section title="Pengalaman Project">
          <Card>
            <Text style={styles.itemTitle}>
              SportWays (E-commerce Olahraga)
            </Text>
            <Text style={styles.itemSubtitle}>
              React, Tailwind, Spring Boot, MySQL
            </Text>
            <Text style={styles.itemDesc}>
              Platform belanja produk olahraga dengan fitur katalog, keranjang,
              dan pembayaran.
            </Text>
          </Card>

          <Card>
            <Text style={styles.itemTitle}>
              Sistem Manajemen Stunting (Health Tech)
            </Text>
            <Text style={styles.itemSubtitle}>
              React, Node/Express, Dashboard
            </Text>
            <Text style={styles.itemDesc}>
              Aplikasi monitoring status gizi dan visualisasi data untuk
              intervensi kesehatan.
            </Text>
          </Card>
        </Section>

        <View style={{height: 24}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const Section: React.FC<{title: string; children: React.ReactNode}> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

const Card: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <View style={styles.card}>{children}</View>;
};

export default App;

/* ------------------------------- Styles ------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
  },
  scrollContent: {
    padding: 16,
  },

  /* Header */
  header: {
    backgroundColor: '#0F172A', // slate-900 vibes
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,

    // shadow (iOS) + elevation (Android)
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 16,
    elevation: 6,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#C7D2FE',
    marginTop: 6,
    fontSize: 13,
  },

  /* Cards */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 4,
  },

  /* Profile Card specifics */
  profileCard: {
    paddingTop: 24,
    paddingBottom: 20,
  },
  photoWrapper: {
    alignItems: 'center',
    marginTop: -48, // sedikit overlap di atas card
    marginBottom: 12,
  },
  photo: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E5E7EB',
  },
  profileTextBlock: {
    marginTop: 4,
  },
  name: {
    color: '#0F172A',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  role: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEF2F7',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    color: '#0F172A',
    fontSize: 14,
    maxWidth: '60%',
    textAlign: 'right',
  },

  /* Sections */
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  /* Badges */
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#3730A3',
    fontSize: 13,
    fontWeight: '700',
  },

  /* Item (Education/Project) */
  itemTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '800',
  },
  itemSubtitle: {
    color: '#475569',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  itemDesc: {
    color: '#0F172A',
    fontSize: 14,
    lineHeight: 20,
  },
});
