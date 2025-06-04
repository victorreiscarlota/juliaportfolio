"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone, Clock, MapPin, Award, Heart, Users } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Menu, MenuItem, HoveredLink } from "@/components/animated-menu"
import { LinkPreview } from "@/components/link-preview"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileHamburgerMenu } from "@/components/mobile-hamburger-menu"
import { Preloader } from "@/components/preloader"

export default function Component() {
  const [active, setActive] = useState<string | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const menuItems = [
    {
      title: "Sobre mim",
      href: "#sobre",
      subitems: [
        { title: "Minha História", href: "#sobre" },
        { title: "Formação", href: "#sobre" },
        { title: "Experiência", href: "#sobre" },
      ],
    },
    {
      title: "Atuação",
      href: "#atuacao",
      subitems: [
        { title: "Terapia Individual", href: "#atuacao" },
        { title: "Terapia de Casal", href: "#atuacao" },
        { title: "Avaliação Psicológica", href: "#atuacao" },
      ],
    },
    {
      title: "Atendimento",
      href: "#atendimento",
      subitems: [
        { title: "Horários", href: "#atendimento" },
        { title: "Localização", href: "#atendimento" },
        { title: "Contato", href: "#atendimento" },
      ],
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const sections = [heroRef.current, aboutRef.current, servicesRef.current, contactRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5511999999999", "_blank")
  }

  const isVisible = (sectionId: string) => visibleSections.has(sectionId)

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-pearl dark:bg-dark-pearl font-serif transition-colors duration-300">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 py-6 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Desktop Name / Mobile Hamburger */}
              <div className="flex items-center">
                {/* Desktop Name */}
                <div
                  className="hidden md:block text-3xl font-light text-pewter dark:text-dark-pewter drop-shadow-sm transition-colors duration-300"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Júlia Penido
                </div>

                {/* Mobile Hamburger Menu */}
                <MobileHamburgerMenu items={menuItems} />
              </div>

              {/* Navigation Menu - Desktop Only */}
              <div className="hidden md:block">
                <Menu setActive={setActive}>
                  <MenuItem setActive={setActive} active={active} item="Sobre mim">
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="#sobre">Minha História</HoveredLink>
                      <HoveredLink href="#sobre">Formação</HoveredLink>
                      <HoveredLink href="#sobre">Experiência</HoveredLink>
                    </div>
                  </MenuItem>
                  <MenuItem setActive={setActive} active={active} item="Atuação">
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="#atuacao">Terapia Individual</HoveredLink>
                      <HoveredLink href="#atuacao">Terapia de Casal</HoveredLink>
                      <HoveredLink href="#atuacao">Avaliação Psicológica</HoveredLink>
                    </div>
                  </MenuItem>
                  <MenuItem setActive={setActive} active={active} item="Atendimento">
                    <div className="flex flex-col space-y-4 text-sm">
                      <HoveredLink href="#atendimento">Horários</HoveredLink>
                      <HoveredLink href="#atendimento">Localização</HoveredLink>
                      <HoveredLink href="#atendimento">Contato</HoveredLink>
                    </div>
                  </MenuItem>
                </Menu>
              </div>

              {/* Right side - Theme Toggle and WhatsApp Button */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-salmon hover:bg-salmon/90 dark:bg-dark-salmon dark:hover:bg-dark-salmon/90 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 drop-shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Agendar Consulta</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="py-20 px-4 pt-32">
          <div className="container mx-auto text-center">
            <div
              className={`transition-all duration-1000 transform ${
                isVisible("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-sandstone dark:bg-dark-sandstone overflow-hidden shadow-lg transition-colors duration-300">
                <Image
                  src="/placeholder.svg?height=192&width=192"
                  alt="Júlia Penido"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1
                className="text-6xl font-light text-pewter dark:text-dark-pewter mb-4 transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Júlia Penido
              </h1>
              <p className="text-xl text-olive-slate dark:text-dark-olive-slate mb-8 max-w-2xl mx-auto transition-colors duration-300">
                <LinkPreview url="https://site.cfp.org.br/" isStatic imageSrc="/placeholder.svg?height=125&width=200">
                  Psicóloga Clínica • CRP 06/123456
                </LinkPreview>
              </p>
              <p className="text-lg text-pewter/80 dark:text-dark-pewter/80 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
                Especialista em{" "}
                <LinkPreview
                  url="https://www.beck-institute.org/"
                  isStatic
                  imageSrc="/placeholder.svg?height=125&width=200"
                >
                  terapia cognitivo-comportamental
                </LinkPreview>
                , oferecendo um espaço seguro e acolhedor para seu bem-estar emocional e crescimento pessoal.
              </p>
            </div>
          </div>
        </section>

        {/* Sobre mim Section */}
        <section
          ref={aboutRef}
          id="sobre"
          className="py-20 px-4 bg-sandstone/30 dark:bg-dark-sandstone/30 transition-colors duration-300"
        >
          <div className="container mx-auto">
            <div
              className={`transition-all duration-1000 delay-200 transform ${
                isVisible("sobre") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2
                className="text-5xl font-light text-pewter dark:text-dark-pewter text-center mb-16 transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Sobre mim
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div
                    className={`transition-all duration-800 delay-400 transform ${
                      isVisible("sobre") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                  >
                    <p className="text-lg text-pewter/80 dark:text-dark-pewter/80 leading-relaxed transition-colors duration-300">
                      Formada pela{" "}
                      <LinkPreview url="https://www.usp.br/" isStatic imageSrc="/placeholder.svg?height=125&width=200">
                        Universidade de São Paulo (USP)
                      </LinkPreview>
                      , com especialização em Terapia Cognitivo-Comportamental pelo{" "}
                      <LinkPreview
                        url="https://www.hc.fm.usp.br/"
                        isStatic
                        imageSrc="/placeholder.svg?height=125&width=200"
                      >
                        Hospital das Clínicas
                      </LinkPreview>
                      . Minha abordagem combina técnicas baseadas em evidências com um olhar humanizado e personalizado.
                    </p>
                  </div>

                  <div
                    className={`transition-all duration-800 delay-600 transform ${
                      isVisible("sobre") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                  >
                    <p className="text-lg text-pewter/80 dark:text-dark-pewter/80 leading-relaxed transition-colors duration-300">
                      Acredito que cada pessoa possui recursos internos únicos para superar desafios. Meu papel é
                      facilitar esse processo de{" "}
                      <LinkPreview
                        url="https://www.apa.org/topics/therapy"
                        isStatic
                        imageSrc="/placeholder.svg?height=125&width=200"
                      >
                        autodescoberta e crescimento
                      </LinkPreview>
                      , oferecendo ferramentas práticas e suporte emocional.
                    </p>
                  </div>

                  <div
                    className={`flex flex-wrap gap-6 transition-all duration-800 delay-800 transform ${
                      isVisible("sobre") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                  >
                    <div className="flex items-center text-olive-slate dark:text-dark-olive-slate bg-white/50 dark:bg-dark-pearl/50 px-4 py-2 rounded-full transition-colors duration-300">
                      <Award className="w-5 h-5 mr-2" />
                      <span>Especialização em TCC</span>
                    </div>
                    <div className="flex items-center text-olive-slate dark:text-dark-olive-slate bg-white/50 dark:bg-dark-pearl/50 px-4 py-2 rounded-full transition-colors duration-300">
                      <Heart className="w-5 h-5 mr-2" />
                      <span>10+ anos de experiência</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`space-y-4 transition-all duration-1000 delay-300 transform ${
                    isVisible("sobre") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                >
                  <div className="w-full h-64 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src="/placeholder.svg?height=256&width=400"
                      alt="Consultório"
                      width={400}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-32 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Certificado USP"
                        width={200}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-32 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Especialização TCC"
                        width={200}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atuação Section */}
        <section ref={servicesRef} id="atuacao" className="py-20 px-4">
          <div className="container mx-auto">
            <div
              className={`transition-all duration-1000 delay-200 transform ${
                isVisible("atuacao") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2
                className="text-5xl font-light text-pewter dark:text-dark-pewter text-center mb-16 transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Atuação
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div
                  className={`transition-all duration-800 delay-400 transform ${
                    isVisible("atuacao") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <Card className="bg-white dark:bg-dark-pearl border-sandstone dark:border-dark-sandstone hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-salmon/30 dark:hover:border-dark-salmon/30 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-salmon/20 dark:bg-dark-salmon/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                        <Heart className="w-8 h-8 text-salmon dark:text-dark-salmon transition-colors duration-300" />
                      </div>
                      <h3
                        className="text-xl font-medium text-pewter dark:text-dark-pewter mb-4 transition-colors duration-300"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Terapia Individual
                      </h3>
                      <p className="text-pewter/70 dark:text-dark-pewter/70 leading-relaxed transition-colors duration-300">
                        Atendimento personalizado para{" "}
                        <LinkPreview
                          url="https://www.anxiety.org/"
                          isStatic
                          imageSrc="/placeholder.svg?height=125&width=200"
                        >
                          ansiedade, depressão
                        </LinkPreview>
                        , traumas e questões de autoestima. Foco no desenvolvimento de estratégias práticas para o dia a
                        dia.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div
                  className={`transition-all duration-800 delay-600 transform ${
                    isVisible("atuacao") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <Card className="bg-white dark:bg-dark-pearl border-sandstone dark:border-dark-sandstone hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-salmon/30 dark:hover:border-dark-salmon/30 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-olive-slate/20 dark:bg-dark-olive-slate/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                        <Users className="w-8 h-8 text-olive-slate dark:text-dark-olive-slate transition-colors duration-300" />
                      </div>
                      <h3
                        className="text-xl font-medium text-pewter dark:text-dark-pewter mb-4 transition-colors duration-300"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Terapia de Casal
                      </h3>
                      <p className="text-pewter/70 dark:text-dark-pewter/70 leading-relaxed transition-colors duration-300">
                        Trabalho focado em{" "}
                        <LinkPreview
                          url="https://www.gottman.com/"
                          isStatic
                          imageSrc="/placeholder.svg?height=125&width=200"
                        >
                          comunicação e resolução de conflitos
                        </LinkPreview>
                        . Fortalecimento de vínculos e desenvolvimento de habilidades relacionais saudáveis.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div
                  className={`transition-all duration-800 delay-800 transform ${
                    isVisible("atuacao") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <Card className="bg-white dark:bg-dark-pearl border-sandstone dark:border-dark-sandstone hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-salmon/30 dark:hover:border-dark-salmon/30 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-salmon/20 dark:bg-dark-salmon/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                        <Award className="w-8 h-8 text-salmon dark:text-dark-salmon transition-colors duration-300" />
                      </div>
                      <h3
                        className="text-xl font-medium text-pewter dark:text-dark-pewter mb-4 transition-colors duration-300"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        Avaliação Psicológica
                      </h3>
                      <p className="text-pewter/70 dark:text-dark-pewter/70 leading-relaxed transition-colors duration-300">
                        Avaliações especializadas para{" "}
                        <LinkPreview
                          url="https://www.apa.org/science/about/psa/2003/10/assessment"
                          isStatic
                          imageSrc="/placeholder.svg?height=125&width=200"
                        >
                          diagnóstico e orientação
                        </LinkPreview>
                        . Relatórios detalhados para contextos clínicos, educacionais e organizacionais.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atendimento Section */}
        <section
          ref={contactRef}
          id="atendimento"
          className="py-20 px-4 bg-sandstone/30 dark:bg-dark-sandstone/30 transition-colors duration-300"
        >
          <div className="container mx-auto">
            <div
              className={`transition-all duration-1000 delay-200 transform ${
                isVisible("atendimento") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2
                className="text-5xl font-light text-pewter dark:text-dark-pewter text-center mb-16 transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Atendimento
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div
                  className={`transition-all duration-800 delay-400 transform ${
                    isVisible("atendimento") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                >
                  <h3
                    className="text-2xl font-medium text-pewter dark:text-dark-pewter mb-8 transition-colors duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Informações Práticas
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start bg-white/50 dark:bg-dark-pearl/50 p-4 rounded-lg transition-colors duration-300">
                      <Clock className="w-6 h-6 text-salmon dark:text-dark-salmon mr-4 mt-1 transition-colors duration-300" />
                      <div>
                        <h4 className="font-medium text-pewter dark:text-dark-pewter mb-2 transition-colors duration-300">
                          Horários
                        </h4>
                        <p className="text-pewter/70 dark:text-dark-pewter/70 transition-colors duration-300">
                          Segunda a Sexta: 8h às 18h
                          <br />
                          Sábado: 8h às 12h
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white/50 dark:bg-dark-pearl/50 p-4 rounded-lg transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-salmon dark:text-dark-salmon mr-4 mt-1 transition-colors duration-300" />
                      <div>
                        <h4 className="font-medium text-pewter dark:text-dark-pewter mb-2 transition-colors duration-300">
                          Localização
                        </h4>
                        <p className="text-pewter/70 dark:text-dark-pewter/70 transition-colors duration-300">
                          <LinkPreview
                            url="https://maps.google.com"
                            isStatic
                            imageSrc="/placeholder.svg?height=125&width=200"
                          >
                            Rua das Flores, 123
                            <br />
                            Centro - São Paulo/SP
                          </LinkPreview>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white/50 dark:bg-dark-pearl/50 p-4 rounded-lg transition-colors duration-300">
                      <Phone className="w-6 h-6 text-salmon dark:text-dark-salmon mr-4 mt-1 transition-colors duration-300" />
                      <div>
                        <h4 className="font-medium text-pewter dark:text-dark-pewter mb-2 transition-colors duration-300">
                          Contato
                        </h4>
                        <p className="text-pewter/70 dark:text-dark-pewter/70 transition-colors duration-300">
                          <LinkPreview
                            url="https://wa.me/5511999999999"
                            isStatic
                            imageSrc="/placeholder.svg?height=125&width=200"
                          >
                            (11) 99999-9999
                          </LinkPreview>
                          <br />
                          contato@juliapenido.com.br
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      onClick={handleWhatsAppClick}
                      className="bg-salmon hover:bg-salmon/90 dark:bg-dark-salmon dark:hover:bg-dark-salmon/90 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-lg">Agendar Consulta</span>
                    </Button>
                  </div>
                </div>

                <div
                  className={`space-y-4 transition-all duration-800 delay-600 transform ${
                    isVisible("atendimento") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                  }`}
                >
                  <div className="w-full h-64 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src="/placeholder.svg?height=256&width=400"
                      alt="Sala de atendimento"
                      width={400}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-32 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Recepção"
                        width={200}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-32 bg-sandstone dark:bg-dark-sandstone rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                      <Image
                        src="/placeholder.svg?height=128&width=200"
                        alt="Ambiente acolhedor"
                        width={200}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-pewter dark:bg-dark-pewter text-white dark:text-dark-pearl transition-colors duration-300">
          <div className="container mx-auto text-center">
            <div
              className={`transition-all duration-800 transform ${
                isVisible("atendimento") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <p className="text-white/80 dark:text-dark-pearl/80 mb-4 transition-colors duration-300">
                © 2024 Júlia Penido - Psicóloga Clínica
              </p>
              <p className="text-white/60 dark:text-dark-pearl/60 text-sm transition-colors duration-300">
                CRP 06/123456 • Todos os direitos reservados
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
