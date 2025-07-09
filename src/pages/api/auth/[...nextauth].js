import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const res = await fetch("https://6836865f664e72d28e4119cb.mockapi.io/api/toko_saya/users");
                const user = await res.json();

                const userData = user.find(
                    (user) => 
                        user.email === credentials.email && 
                        user.password === credentials.password
                );
                
                if (userData) {
                    /*
                    jika user ditemukan, maka kembalikan data user
                    bisa ditampilkan di halaman website atau komponen tertentu
                    */
                    return {
                        id: userData.id,
                        email: userData.email,
                        name: userData.name
                    };
                } else {
                    /*
                    jika user tidak ditemukan, maka kembalikan null
                    nextAuth menganggap login gagal
                    */
                    return null;
                }
            },
        }),
    ],  

    pages: {
        signIn: "/",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },

    secret: "ini kode rahasia",

})