import { useState } from "react";

const MOEDA = "S/";
const IOF = 0.035;

const getPreco = (tabela, pax) => {
  if (pax <= 5) return tabela[pax - 1];
  if (pax === 6 || pax === 7) return null;
  return tabela[5];
};

const getTarifaWU = (valorReais) => {
  if (valorReais <= 500)       return 6;
  if (valorReais <= 1500)      return 15;
  if (valorReais <= 2500)      return 20;
  if (valorReais <= 5000)      return 45;
  return 80;
};

const passeios = [
  { id: 1,  nome: "City Tour Cusco",               tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🏛️", cor: "#D97706", descricao: "Sacsayhuaman, Qenqo, Puka Pukara e Tambomachay.",              precos: [200, 200, 250, 350, 400, 600],       temPdf: true  },
  { id: 2,  nome: "7 Lagunas Ausangate",            tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🏔️", cor: "#0EA5E9", descricao: "7 lagoas coloridas, fauna andina e águas termais.",            precos: [500, 530, 580, 650, 750, 1200],      temPdf: true  },
  { id: 3,  nome: "City Tour Lima",                 tipo: "COMPARTILHADO", destino: "Lima",  emoji: "🏙️", cor: "#8B5CF6", descricao: "Miraflores, Huaca Pucllana, Plaza de Armas e Catacumbas.",     precos: [120, 240, 360, 480, 600, 960],       temPdf: true  },
  { id: 4,  nome: "Laguna Humantay",                tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🩵", cor: "#06B6D4", descricao: "Lagoa turquesa a 4.200m alimentada pelo nevado Salkantay.",    precos: [450, 530, 580, 650, 750, 1200],      temPdf: true  },
  { id: 5,  nome: "Machu Picchu",                   tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🦙", cor: "#10B981", descricao: "Imersão privativa de ~2h na cidadela com guia especializado.", precos: [1050, 2100, 3150, 4200, 5250, 8400], temPdf: true  },
  { id: 6,  nome: "Walking Tour Cusco",             tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🚶", cor: "#F59E0B", descricao: "Mercado San Pedro, Pedra dos 12 Ângulos, San Blas e Sapantiana.", precos: [70, 70, 100, 150, 200, 250],       temPdf: true  },
  { id: 7,  nome: "Ruta del Sur",                   tipo: "PRIVATIVO",     destino: "Cusco", emoji: "⛪", cor: "#EC4899", descricao: "Tipón, Pikillacta e a 'Capela Sistina das Américas'.",          precos: [300, 300, 350, 400, 500, 700],       temPdf: true  },
  { id: 8,  nome: "Valle Sagrado 2",                tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🧂", cor: "#F97316", descricao: "Chinchero, Moray, Salinas de Maras e Ollantaytambo.",           precos: [400, 480, 580, 650, 720, 1100],      temPdf: true  },
  { id: 9,  nome: "Montanha Colorida – Vinicunca",  tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🌈", cor: "#EF4444", descricao: "Vinicunca a 5.200m — o arco-íris mineral dos Andes.",          precos: [450, 530, 580, 650, 750, 1200],      temPdf: true  },
  { id: 10, nome: "Naupa Iglesia & Quillarumiyoc",  tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🌙", cor: "#6366F1", descricao: "Portal enigmático, Templo da Lua e Ritual Kintu.",             precos: [360, 400, 450, 480, 650, 850],       temPdf: true  },
  { id: 11, nome: "Valle Sagrado 1",                tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🌄", cor: "#84CC16", descricao: "Pisac, Ollantaytambo e mercados tradicionais do vale.",        precos: [400, 480, 580, 650, 720, 1100],      temPdf: true  },
  { id: 12, nome: "Waqrapukara",                    tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🦅", cor: "#14B8A6", descricao: "Fortaleza inca em forma de chifre, trilha de aventura.",       precos: [500, 530, 580, 650, 750, 1200],      temPdf: true  },
  { id: 13, nome: "Palcoyo (Montanha Colorida)",    tipo: "PRIVATIVO",     destino: "Cusco", emoji: "🎨", cor: "#A855F7", descricao: "Montanha Colorida Palccoyo & Ponte Inca.",                     precos: [480, 530, 580, 700, 750, 1200],      temPdf: true  },
  { id: 14, nome: "Maras Moray Quadriciclo",        tipo: "COMPARTILHADO", destino: "Cusco", emoji: "🏍️", cor: "#FB923C", descricao: "Aventura de quadriciclo pelas Salinas de Maras e Moray.",    precos: [190, 190, 380, 380, 570, 760],       temPdf: true  },
];

const traslados = [
  { id: 101, nome: "Traslado Aeroporto → Hotel (Cusco)", emoji: "✈️", cor: "#64748b", descricao: "Recepção no aeroporto e transfer ao hotel em Cusco.", precos: [40, 40, 50, 60, 80, 100],      temPdf: false },
  { id: 102, nome: "Traslado Hotel → Aeroporto (Cusco)", emoji: "🚖", cor: "#64748b", descricao: "Transfer do hotel ao aeroporto em Cusco.",            precos: [40, 40, 50, 60, 80, 100],      temPdf: false },
  { id: 103, nome: "Traslado Aeroporto → Hotel (Lima)",  emoji: "✈️", cor: "#64748b", descricao: "Recepção no aeroporto e transfer ao hotel em Lima.",  precos: [120, 120, 160, 180, 180, 280], temPdf: false },
  { id: 104, nome: "Traslado Hotel → Aeroporto (Lima)",  emoji: "🚖", cor: "#64748b", descricao: "Transfer do hotel ao aeroporto em Lima.",              precos: [120, 120, 160, 180, 180, 280], temPdf: false },
];

const todosItens = [...passeios, ...traslados];

const bloco = {
  background: "rgba(26,18,7,0.97)",
  borderRadius: "12px",
  padding: "13px 18px",
  backdropFilter: "blur(10px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

const labelStyle = {
  fontSize: "9px", color: "#64748b", fontFamily: "monospace",
  letterSpacing: "1.5px", marginBottom: "3px",
};

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px",
  color: "#f1f5f9", fontSize: "16px", outline: "none",
  fontFamily: "'Palatino Linotype', Georgia, serif",
  fontWeight: 600, boxSizing: "border-box",
};

export default function App() {
  const [nome, setNome] = useState("");
  const [pax, setPax] = useState(1);
  const [selecionados, setSelecionados] = useState([]);
  const [cotacao, setCotacao] = useState("");
  const [comissao, setComissao] = useState("");
  const [parceria, setParceria] = useState("");
  const [filtro, setFiltro] = useState("TODOS");

  const toggle = (p) =>
    setSelecionados(prev =>
      prev.find(s => s.id === p.id) ? prev.filter(s => s.id !== p.id) : [...prev, p]
    );

  const isSel = (p) => !!selecionados.find(s => s.id === p.id);
  const getValor = (item) => getPreco(item.precos, pax);

  const totalSoles = selecionados.reduce((acc, p) => acc + (getValor(p) ?? 0), 0);
  const cotacaoNum = Number(cotacao);
  const comissaoNum = Number(comissao);
  const parceriaNum = Number(parceria);

  // Total em reais puro (sem comissão, sem taxa)
  const totalReais = cotacaoNum > 0 ? totalSoles * cotacaoNum : null;

  // Taxa Western Union (calculada sobre o totalReais)
  const tarifaWU    = totalReais !== null ? getTarifaWU(totalReais) : null;
  const iofWU       = totalReais !== null ? totalReais * IOF : null;
  const taxaTotalWU = tarifaWU !== null ? tarifaWU + iofWU : null;

  // Total final = totalReais + comissão + taxa WU
  const totalFinal = totalReais !== null
    ? totalReais * (1 + comissaoNum / 100 + parceriaNum / 100) + (taxaTotalWU ?? 0)
    : null;

  const fmt    = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (v) => v.toLocaleString("pt-BR");

  const resetar = () => {
    setNome(""); setPax(1); setSelecionados([]); setCotacao(""); setComissao(""); setParceria("");
  };

  const listaFiltrada = (() => {
    if (filtro === "TRASLADOS") return traslados;
    if (filtro === "Cusco") return passeios.filter(p => p.destino === "Cusco");
    if (filtro === "Lima") return passeios.filter(p => p.destino === "Lima");
    return todosItens;
  })();

  const semValor = pax === 6 || pax === 7;

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', Georgia, serif",
      background: "linear-gradient(160deg,#1a1207,#2d1f0a 50%,#1a1207)",
      minHeight: "100vh", color: "#f1f5f9",
    }}>

      {/* Header */}
      <div style={{
        padding: "18px 24px", borderBottom: "1px solid rgba(217,119,6,0.2)",
        background: "rgba(0,0,0,0.3)", position: "sticky", top: 0, zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: "10px", color: "#D97706", letterSpacing: "3px", fontFamily: "monospace" }}>WISE TRIPS</div>
          <div style={{ fontSize: "17px" }}>Orçamento de Passeios</div>
        </div>
        {(nome || selecionados.length > 0) && (
          <button onClick={resetar} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#94a3b8", borderRadius: "8px", padding: "6px 14px",
            fontFamily: "inherit", cursor: "pointer", fontSize: "12px",
          }}>Limpar</button>
        )}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "28px 16px 320px" }}>

        {/* Nome + Pax */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", marginBottom: "20px" }}>
          <div>
            <label style={{ ...labelStyle, display: "block", marginBottom: "6px" }}>NOME DO CLIENTE</label>
            <input
              value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: João Silva"
              style={{ ...inputStyle, width: "100%", padding: "11px 14px", fontSize: "15px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px" }}
            />
          </div>
          <div>
            <label style={{ ...labelStyle, display: "block", marginBottom: "6px" }}>PESSOAS</label>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", overflow: "hidden", height: "44px" }}>
              <button onClick={() => setPax(p => Math.max(1, p - 1))} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#f1f5f9", width: "38px", height: "100%", fontSize: "18px", cursor: "pointer" }}>−</button>
              <div style={{ width: "40px", textAlign: "center", fontSize: "16px", fontWeight: 600, color: "#D97706" }}>{pax}</div>
              <button onClick={() => setPax(p => p + 1)} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#f1f5f9", width: "38px", height: "100%", fontSize: "18px", cursor: "pointer" }}>+</button>
            </div>
          </div>
        </div>

        {semValor && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", padding: "10px 16px", marginBottom: "16px", fontSize: "12px", color: "#fca5a5" }}>
            ⚠️ Ainda não temos tabela de preços para 6 ou 7 pessoas.
          </div>
        )}

        {/* Filtros */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
          {["TODOS", "Cusco", "Lima", "TRASLADOS"].map(f => (
            <button key={f} onClick={() => setFiltro(f)} style={{
              background: filtro === f ? "rgba(217,119,6,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filtro === f ? "rgba(217,119,6,0.6)" : "rgba(255,255,255,0.1)"}`,
              color: filtro === f ? "#D97706" : "#94a3b8",
              borderRadius: "20px", padding: "5px 14px", fontFamily: "monospace",
              fontSize: "10px", letterSpacing: "1px", cursor: "pointer", transition: "all 0.15s",
            }}>{f}</button>
          ))}
        </div>

        {/* Lista */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ ...labelStyle, marginBottom: "12px" }}>PASSEIOS DISPONÍVEIS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {listaFiltrada.map(p => {
              const sel = isSel(p);
              const valor = getValor(p);
              const indisponivel = valor === null;
              return (
                <div key={p.id} onClick={() => !indisponivel && toggle(p)} style={{
                  background: sel ? "rgba(217,119,6,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${sel ? p.cor + "66" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "12px", padding: "14px 16px",
                  cursor: indisponivel ? "not-allowed" : "pointer",
                  transition: "all 0.15s", display: "flex", alignItems: "center", gap: "12px",
                  opacity: indisponivel ? 0.45 : 1,
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0, background: p.cor + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{p.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "2px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600 }}>{p.nome}</span>
                      <span style={{ fontSize: "9px", padding: "2px 7px", borderRadius: "20px", background: p.tipo === "PRIVATIVO" ? "rgba(217,119,6,0.2)" : p.tipo === "COMPARTILHADO" ? "rgba(236,72,153,0.2)" : "rgba(100,116,139,0.2)", color: p.tipo === "PRIVATIVO" ? "#F97316" : p.tipo === "COMPARTILHADO" ? "#EC4899" : "#94a3b8", fontFamily: "monospace" }}>{p.tipo || "TRASLADO"}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{p.destino ? `${p.destino} · ` : ""}{p.descricao}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {indisponivel ? (
                      <div style={{ fontSize: "11px", color: "#ef4444" }}>Sob consulta</div>
                    ) : (
                      <>
                        <div style={{ fontSize: "15px", fontWeight: 600, color: sel ? "#D97706" : "#94a3b8" }}>{MOEDA} {fmtInt(valor)}</div>
                        <div style={{ fontSize: "10px", color: "#475569" }}>{pax} pax</div>
                      </>
                    )}
                    <div style={{
                      width: "22px", height: "22px", borderRadius: "50%",
                      background: sel ? "#D97706" : "transparent",
                      border: `2px solid ${sel ? "#D97706" : "rgba(255,255,255,0.2)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginLeft: "auto", marginTop: "4px", fontSize: "11px", color: "#fff",
                    }}>{sel ? "✓" : ""}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rodapé flutuante */}
      {selecionados.length > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, #1a1207 90%, transparent)",
          padding: "12px 16px 20px", zIndex: 20,
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "5px" }}>

            {/* 1 — Total em Soles */}
            <div style={{ ...bloco, border: "1px solid rgba(217,119,6,0.4)" }}>
              <div>
                <div style={labelStyle}>TOTAL DO PACOTE</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#D97706", lineHeight: 1 }}>
                  {MOEDA} {fmtInt(totalSoles)}
                </div>
                {pax > 1 && <div style={{ fontSize: "11px", color: "#78716c", marginTop: "2px" }}>{MOEDA} {fmtInt(Math.round(totalSoles / pax))} p/ pessoa</div>}
              </div>
              <div style={{ textAlign: "right", fontSize: "11px", color: "#475569" }}>
                {nome && <div style={{ color: "#94a3b8", marginBottom: "2px" }}>{nome}</div>}
                <div>{selecionados.length} item{selecionados.length > 1 ? "s" : ""} · {pax} pax</div>
              </div>
            </div>

            {/* 2 — Cotação */}
            <div style={{ ...bloco, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <div style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}>COTAÇÃO DO DIA &nbsp;1 SOL =</div>
                <div style={{ position: "relative", flex: 1, maxWidth: "160px" }}>
                  <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#4ade80", fontWeight: 700, fontFamily: "monospace" }}>R$</span>
                  <input
                    type="number" min="0" step="0.01" value={cotacao}
                    onChange={e => setCotacao(e.target.value)} placeholder="0,00"
                    style={{ ...inputStyle, width: "100%", padding: "8px 12px 8px 34px" }}
                  />
                </div>
              </div>
            </div>

            {/* 3 — Total em Reais */}
            <div style={{ ...bloco, border: `1px solid ${cotacaoNum > 0 ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.06)"}`, opacity: cotacaoNum > 0 ? 1 : 0.4 }}>
              <div>
                <div style={labelStyle}>TOTAL EM REAIS</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>
                  {cotacaoNum > 0 ? `R$ ${fmt(totalSoles * cotacaoNum)}` : "R$ —"}
                </div>
                {cotacaoNum > 0 && pax > 1 && <div style={{ fontSize: "11px", color: "#86efac", marginTop: "2px" }}>R$ {fmt(totalSoles * cotacaoNum / pax)} p/ pessoa</div>}
              </div>
            </div>

            {/* 4 — Taxa de Transferência Western Union */}
            <div style={{ ...bloco, border: `1px solid ${cotacaoNum > 0 ? "rgba(148,163,184,0.3)" : "rgba(255,255,255,0.05)"}`, opacity: cotacaoNum > 0 ? 1 : 0.35 }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...labelStyle, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>TAXA DE TRANSFERÊNCIA</span>
                  <span style={{ background: "rgba(148,163,184,0.15)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "4px", padding: "1px 6px", color: "#94a3b8" }}>WESTERN UNION</span>
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {/* Tarifa de serviço */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>TARIFA SERVIÇO</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#94a3b8" }}>
                      {tarifaWU !== null ? `R$ ${fmt(tarifaWU)}` : "R$ —"}
                    </div>
                  </div>
                  {/* IOF */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>IOF (3,5%)</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#94a3b8" }}>
                      {iofWU !== null ? `R$ ${fmt(iofWU)}` : "R$ —"}
                    </div>
                  </div>
                  {/* Total taxa */}
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>TOTAL DA TAXA</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#cbd5e1" }}>
                      {taxaTotalWU !== null ? `R$ ${fmt(taxaTotalWU)}` : "R$ —"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 — Comissão */}
            <div style={{ ...bloco, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <div style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}>MINHA COMISSÃO</div>
                <div style={{ position: "relative", flex: 1, maxWidth: "140px" }}>
                  <input
                    type="number" min="0" max="999" value={comissao}
                    onChange={e => setComissao(e.target.value)} placeholder="0"
                    style={{ ...inputStyle, width: "100%", padding: "8px 30px 8px 12px" }}
                  />
                  <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#D97706", fontWeight: 700 }}>%</span>
                </div>
              </div>
              {cotacaoNum > 0 && comissaoNum > 0 && (
                <div style={{ fontSize: "12px", color: "#fbbf24", whiteSpace: "nowrap", textAlign: "right" }}>
                  <div style={{ fontSize: "9px", ...labelStyle, marginBottom: "2px" }}>VALOR DA COMISSÃO</div>
                  R$ {fmt(totalSoles * cotacaoNum * comissaoNum / 100)}
                </div>
              )}
            </div>

            {/* 6 — Lucro de Parceria */}
            <div style={{ ...bloco, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <div style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}>LUCRO DE PARCERIA</div>
                <div style={{ position: "relative", flex: 1, maxWidth: "140px" }}>
                  <input
                    type="number" min="0" max="999" value={parceria}
                    onChange={e => setParceria(e.target.value)} placeholder="0"
                    style={{ ...inputStyle, width: "100%", padding: "8px 30px 8px 12px" }}
                  />
                  <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#A78BFA", fontWeight: 700 }}>%</span>
                </div>
              </div>
              {cotacaoNum > 0 && parceriaNum > 0 && (
                <div style={{ fontSize: "12px", color: "#A78BFA", whiteSpace: "nowrap", textAlign: "right" }}>
                  <div style={{ fontSize: "9px", ...labelStyle, marginBottom: "2px" }}>VALOR DA PARCERIA</div>
                  R$ {fmt(totalReais * parceriaNum / 100)}
                </div>
              )}
            </div>

            {/* 7 — Total Final ao Cliente */}
            <div style={{ ...bloco, border: `1px solid ${totalFinal !== null ? "rgba(251,191,36,0.6)" : "rgba(217,119,6,0.3)"}`, padding: "14px 18px" }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>VALOR FINAL AO CLIENTE</div>
                {cotacaoNum > 0 && taxaTotalWU !== null && (
                  <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <span>Pacote: R$ {fmt(totalReais)}</span>
                    {comissaoNum > 0 && <span style={{ color: "#fbbf24" }}>+ comissão: R$ {fmt(totalReais * comissaoNum / 100)}</span>}
                    {parceriaNum > 0 && <span style={{ color: "#A78BFA" }}>+ parceria: R$ {fmt(totalReais * parceriaNum / 100)}</span>}
                    <span style={{ color: "#94a3b8" }}>+ taxa WU: R$ {fmt(taxaTotalWU)}</span>
                  </div>
                )}
                <div style={{ fontSize: "28px", fontWeight: 700, color: "#fbbf24", lineHeight: 1 }}>
                  {totalFinal !== null
                    ? `R$ ${fmt(totalFinal)}`
                    : <span style={{ color: "#475569", fontSize: "18px" }}>Insira a cotação</span>
                  }
                </div>
                {totalFinal !== null && pax > 1 && (
                  <div style={{ fontSize: "11px", color: "#fde68a", marginTop: "3px" }}>
                    R$ {fmt(totalFinal / pax)} p/ pessoa
                  </div>
                )}
              </div>
              {selecionados.some(s => s.temPdf) && (
                <button style={{
                  background: "#D97706", color: "#fff", border: "none",
                  borderRadius: "10px", padding: "12px 20px",
                  fontSize: "14px", fontFamily: "inherit", cursor: "pointer", whiteSpace: "nowrap",
                }}>📄 Gerar PDF</button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
