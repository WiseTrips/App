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

const TABELA_PARCELAS = {
  2:  { taxaVenda: 2.69, taxaParcela: 1.70  },
  3:  { taxaVenda: 2.69, taxaParcela: 2.55  },
  4:  { taxaVenda: 2.69, taxaParcela: 3.40  },
  5:  { taxaVenda: 2.69, taxaParcela: 4.25  },
  6:  { taxaVenda: 2.69, taxaParcela: 5.10  },
  7:  { taxaVenda: 2.29, taxaParcela: 5.95  },
  8:  { taxaVenda: 2.29, taxaParcela: 6.80  },
  9:  { taxaVenda: 2.29, taxaParcela: 7.65  },
  10: { taxaVenda: 2.29, taxaParcela: 8.50  },
  11: { taxaVenda: 2.29, taxaParcela: 9.35  },
  12: { taxaVenda: 2.29, taxaParcela: 10.20 },
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
  const [simValor, setSimValor] = useState("");
  const [simEntradaPct, setSimEntradaPct] = useState("");
  const [simParcelas, setSimParcelas] = useState("");
  const [tela, setTela] = useState("selecao"); // "selecao" | "orcamento"

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

  // Total com comissão aplicada
  const totalComComissao = totalReais !== null
    ? totalReais * (1 + comissaoNum / 100)
    : null;

  // Parceria aplicada sobre (totalReais + comissão)
  const valorParceria = totalComComissao !== null && parceriaNum > 0
    ? totalComComissao * (parceriaNum / 100)
    : null;

  // Total com comissão + parceria
  const totalComParceria = totalComComissao !== null
    ? totalComComissao * (1 + parceriaNum / 100)
    : null;

  // Taxa Western Union (calculada sobre o totalReais puro)
  const tarifaWU    = totalReais !== null ? getTarifaWU(totalReais) : null;
  const iofWU       = totalReais !== null ? totalReais * IOF : null;
  const taxaTotalWU = tarifaWU !== null ? tarifaWU + iofWU : null;

  // Total final = (totalReais + comissão + parceria) + taxa WU
  const totalFinal = totalComParceria !== null
    ? totalComParceria + (taxaTotalWU ?? 0)
    : null;

  // Simulador de entrada / saldo
  const simValorNum = Number(simValor);
  const simEntradaPctNum = Number(simEntradaPct);
  const simValorEntrada = simValorNum > 0 && simEntradaPctNum > 0
    ? simValorNum * (simEntradaPctNum / 100)
    : null;
  const simSaldo = simValorEntrada !== null
    ? simValorNum - simValorEntrada
    : null;

  // Simulador de parcelamento sobre o saldo
  const simParcelasNum = Number(simParcelas);
  const simTabela = TABELA_PARCELAS[simParcelasNum] ?? null;
  const simBase = simSaldo !== null ? simSaldo : null;
  const simValorParcela = simBase !== null && simTabela && simParcelasNum > 0
    ? simBase / simParcelasNum
    : null;
  const simJurosTotal = simBase !== null && simTabela
    ? simBase * (simTabela.taxaVenda / 100) + simBase * (simTabela.taxaParcela / 100)
    : null;
  const simVoceRecebe = simBase !== null && simJurosTotal !== null
    ? simBase - simJurosTotal
    : null;
  const simTotalParcelas = simValorParcela !== null
    ? simValorParcela * simParcelasNum
    : null;

  const fmt    = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (v) => v.toLocaleString("pt-BR");

  const resetar = () => {
    setNome(""); setPax(1); setSelecionados([]); setCotacao(""); setComissao(""); setParceria("");
    setSimValor(""); setSimEntradaPct(""); setSimParcelas(""); setTela("selecao");
  };

  const listaFiltrada = (() => {
    if (filtro === "TRASLADOS") return traslados;
    if (filtro === "Cusco") return passeios.filter(p => p.destino === "Cusco");
    if (filtro === "Lima") return passeios.filter(p => p.destino === "Lima");
    return todosItens;
  })();

  const semValor = pax === 6 || pax === 7;

  const gerarPdf = () => {
    const f = (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Cotação Wise Trips${nome ? " — " + nome : ""}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #fff; color: #1a1207; padding: 40px; max-width: 600px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #D97706; padding-bottom: 16px; margin-bottom: 28px; }
    .brand { font-size: 10px; color: #D97706; letter-spacing: 3px; font-family: monospace; margin-bottom: 4px; }
    .title { font-size: 20px; font-weight: bold; }
    .meta { font-size: 12px; color: #64748b; text-align: right; }
    .bloco { border-radius: 12px; padding: 18px 20px; margin-bottom: 16px; border: 1.5px solid #e2e8f0; }
    .bloco-label { font-size: 9px; color: #64748b; font-family: monospace; letter-spacing: 1.5px; margin-bottom: 12px; }
    .linha { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .linha:last-child { margin-bottom: 0; }
    .linha-label { font-size: 12px; color: #475569; }
    .linha-valor { font-size: 13px; font-weight: 600; }
    .destaque { font-size: 26px; font-weight: bold; }
    .orange { color: #D97706; }
    .amber { color: #f59e0b; }
    .blue { color: #0ea5e9; }
    .red { color: #ef4444; }
    .pct { font-size: 11px; color: #94a3b8; margin-left: 5px; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 10px 0; }
    @media print { button { display: none !important; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">WISE TRIPS</div>
      <div class="title">Proposta de Cotação</div>
      ${nome ? `<div style="font-size:13px;color:#475569;margin-top:4px;">Cliente: <strong>${nome}</strong></div>` : ""}
    </div>
    <div class="meta">${pax} pessoa${pax > 1 ? "s" : ""}<br/>${selecionados.length} passeio${selecionados.length > 1 ? "s" : ""}</div>
  </div>

  <div class="bloco" style="border-color:#D97706;">
    <div class="bloco-label">COMPOSIÇÃO DO VALOR</div>
    <div class="linha">
      <span class="linha-label">Valor total sem comissão do parceiro</span>
      <span class="linha-valor orange">R$ ${f(totalComComissao)}</span>
    </div>
    <hr/>
    <div class="linha">
      <span class="linha-label">Comissão do parceiro<span class="pct">(${parceriaNum}%)</span></span>
      <span class="linha-valor amber">R$ ${f(totalComComissao * parceriaNum / 100)}</span>
    </div>
    <hr/>
    <div class="linha">
      <span style="font-size:13px;font-weight:700;">Total com comissão do parceiro</span>
      <span class="destaque orange">R$ ${f(totalComParceria)}</span>
    </div>
  </div>

  <div class="bloco" style="border-color:#f59e0b;">
    <div class="bloco-label">RESUMO FINAL PARA COBRANÇA</div>
    <div class="linha">
      <span class="linha-label">Valor total com comissões</span>
      <span class="linha-valor orange">R$ ${f(totalComParceria)}</span>
    </div>
    ${taxaTotalWU !== null ? `<div class="linha"><span class="linha-label">Taxa de transferência (Western Union)</span><span class="linha-valor" style="color:#64748b;">R$ ${f(taxaTotalWU)}</span></div>` : ""}
    ${simJurosTotal !== null ? `<div class="linha"><span class="linha-label">Juros da financiadora (${simParcelasNum}x)</span><span class="linha-valor red">R$ ${f(simJurosTotal)}</span></div>` : ""}
    <hr/>
    <div class="linha">
      <span style="font-size:13px;font-weight:700;">Valor total para a cotação</span>
      <span class="destaque orange">R$ ${f(simValorNum)}</span>
    </div>
    ${simValorEntrada !== null ? `<hr/><div class="linha"><span class="linha-label">Entrada<span class="pct">(${simEntradaPctNum}%)</span></span><span class="linha-valor blue">R$ ${f(simValorEntrada)}</span></div>` : ""}
    ${simValorParcela !== null ? `<div class="linha"><span class="linha-label">Parcelamento do saldo</span><span class="linha-valor blue">${simParcelasNum}x de R$ ${f(simValorParcela)}</span></div>` : ""}
  </div>

  <div style="text-align:center;margin-top:28px;">
    <button onclick="window.print()" style="background:#D97706;color:#fff;border:none;border-radius:8px;padding:10px 28px;font-size:14px;cursor:pointer;font-family:inherit;">🖨️ Imprimir / Salvar PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

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
          <div style={{ fontSize: "17px" }}>
            {tela === "selecao" ? "Orçamento de Passeios" : "Resumo do Orçamento"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {tela === "orcamento" && (
            <button onClick={() => setTela("selecao")} style={{
              background: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.4)",
              color: "#D97706", borderRadius: "8px", padding: "6px 14px",
              fontFamily: "inherit", cursor: "pointer", fontSize: "12px",
            }}>← Voltar</button>
          )}
          {(nome || selecionados.length > 0) && (
            <button onClick={resetar} style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8", borderRadius: "8px", padding: "6px 14px",
              fontFamily: "inherit", cursor: "pointer", fontSize: "12px",
            }}>Limpar</button>
          )}
        </div>
      </div>

      {/* ── TELA 1: SELEÇÃO ── */}
      {tela === "selecao" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "28px 16px 120px" }}>

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
      )}

      {/* Botão Próximo — fixo no fundo da tela de seleção */}
      {tela === "selecao" && selecionados.length > 0 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, #1a1207 80%, transparent)",
          padding: "16px 16px 24px", zIndex: 20,
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {/* Mini resumo */}
            <div style={{
              background: "rgba(26,18,7,0.97)", border: "1px solid rgba(217,119,6,0.3)",
              borderRadius: "12px", padding: "10px 16px", marginBottom: "10px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                {nome && <span style={{ color: "#f1f5f9", marginRight: "8px" }}>{nome}</span>}
                {selecionados.length} item{selecionados.length > 1 ? "s" : ""} · {pax} pax
              </div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#D97706" }}>
                {MOEDA} {fmtInt(totalSoles)}
              </div>
            </div>
            <button
              onClick={() => setTela("orcamento")}
              style={{
                width: "100%", padding: "14px", background: "#D97706", color: "#fff",
                border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.5px",
              }}
            >
              Próximo →
            </button>
          </div>
        </div>
      )}

      {/* ── TELA 2: ORÇAMENTO ── */}
      {tela === "orcamento" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px 16px 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

            {/* Resumo dos passeios selecionados */}
            <div style={{ ...bloco, border: "1px solid rgba(217,119,6,0.2)", flexDirection: "column", alignItems: "stretch", gap: "8px", marginBottom: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={labelStyle}>PASSEIOS SELECIONADOS</div>
                <div style={{ fontSize: "10px", color: "#475569" }}>{selecionados.length} item{selecionados.length > 1 ? "s" : ""} · {pax} pax{nome ? ` · ${nome}` : ""}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {selecionados.map(s => (
                  <div key={s.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                    <span style={{ color: "#94a3b8" }}>{s.emoji} {s.nome}</span>
                    <span style={{ color: "#D97706", fontWeight: 600 }}>{MOEDA} {fmtInt(getValor(s))}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 1 — Total em Soles */}
            <div style={{ ...bloco, border: "1px solid rgba(217,119,6,0.4)" }}>
              <div>
                <div style={labelStyle}>TOTAL DO PACOTE</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#D97706", lineHeight: 1 }}>
                  {MOEDA} {fmtInt(totalSoles)}
                </div>
                {pax > 1 && <div style={{ fontSize: "11px", color: "#78716c", marginTop: "2px" }}>{MOEDA} {fmtInt(Math.round(totalSoles / pax))} p/ pessoa</div>}
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

            {/* 4 — Comissão */}
            <div style={{ ...bloco, border: "1px solid rgba(255,255,255,0.08)", flexDirection: "column", alignItems: "stretch", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ ...labelStyle, marginBottom: 0, whiteSpace: "nowrap" }}>MINHA COMISSÃO</div>
                <div style={{ position: "relative", flex: 1, maxWidth: "140px" }}>
                  <input
                    type="number" min="0" max="999" value={comissao}
                    onChange={e => setComissao(e.target.value)} placeholder="0"
                    style={{ ...inputStyle, width: "100%", padding: "8px 30px 8px 12px" }}
                  />
                  <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: "#D97706", fontWeight: 700 }}>%</span>
                </div>
                {cotacaoNum > 0 && comissaoNum > 0 && totalReais !== null && (
                  <div style={{ fontSize: "12px", color: "#fbbf24", whiteSpace: "nowrap", textAlign: "right", marginLeft: "auto" }}>
                    <div style={{ fontSize: "9px", ...labelStyle, marginBottom: "2px" }}>VALOR DA COMISSÃO</div>
                    R$ {fmt(totalReais * comissaoNum / 100)}
                  </div>
                )}
              </div>
              {cotacaoNum > 0 && comissaoNum > 0 && totalComComissao !== null && (
                <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1.5px" }}>TOTAL COM COMISSÃO</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "#fbbf24" }}>R$ {fmt(totalComComissao)}</div>
                </div>
              )}
            </div>

            {/* 5 — Lucro de Parceria */}
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
              {cotacaoNum > 0 && parceriaNum > 0 && totalComComissao !== null && (
                <div style={{ fontSize: "12px", color: "#A78BFA", whiteSpace: "nowrap", textAlign: "right" }}>
                  <div style={{ fontSize: "9px", ...labelStyle, marginBottom: "2px" }}>VALOR DA PARCERIA</div>
                  R$ {fmt(totalComComissao * parceriaNum / 100)}
                </div>
              )}
            </div>

            {/* 5.5 — Valor Total com Comissões */}
            <div style={{ ...bloco, border: `1px solid ${totalComParceria !== null ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.06)"}`, opacity: totalComParceria !== null ? 1 : 0.4 }}>
              <div>
                <div style={labelStyle}>VALOR TOTAL COM COMISSÕES</div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#a78bfa", lineHeight: 1 }}>
                  {totalComParceria !== null ? `R$ ${fmt(totalComParceria)}` : "R$ —"}
                </div>
                {totalComParceria !== null && pax > 1 && (
                  <div style={{ fontSize: "11px", color: "#c4b5fd", marginTop: "2px" }}>R$ {fmt(totalComParceria / pax)} p/ pessoa</div>
                )}
              </div>
            </div>

            {/* 6 — Taxa de Transferência Western Union */}
            <div style={{ ...bloco, border: `1px solid ${cotacaoNum > 0 ? "rgba(148,163,184,0.3)" : "rgba(255,255,255,0.05)"}`, opacity: cotacaoNum > 0 ? 1 : 0.35 }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...labelStyle, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>TAXA DE TRANSFERÊNCIA</span>
                  <span style={{ background: "rgba(148,163,184,0.15)", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "4px", padding: "1px 6px", color: "#94a3b8" }}>WESTERN UNION</span>
                </div>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>TARIFA SERVIÇO</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#94a3b8" }}>
                      {tarifaWU !== null ? `R$ ${fmt(tarifaWU)}` : "R$ —"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>IOF (3,5%)</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "#94a3b8" }}>
                      {iofWU !== null ? `R$ ${fmt(iofWU)}` : "R$ —"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "1px" }}>TOTAL DA TAXA</div>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#cbd5e1" }}>
                      {taxaTotalWU !== null ? `R$ ${fmt(taxaTotalWU)}` : "R$ —"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 7 — Total Final ao Cliente */}
            <div style={{ ...bloco, border: `1px solid ${totalFinal !== null ? "rgba(251,191,36,0.6)" : "rgba(217,119,6,0.3)"}`, padding: "14px 18px" }}>
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>VALOR FINAL AO CLIENTE</div>
                {cotacaoNum > 0 && taxaTotalWU !== null && (
                  <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "4px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <span>Pacote: R$ {fmt(totalReais)}</span>
                    {comissaoNum > 0 && <span style={{ color: "#fbbf24" }}>+ comissão: R$ {fmt(totalReais * comissaoNum / 100)}</span>}
                    {parceriaNum > 0 && totalComComissao !== null && <span style={{ color: "#A78BFA" }}>+ parceria: R$ {fmt(totalComComissao * parceriaNum / 100)}</span>}
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
            </div>

            {/* 6.5 — Valor Final Proposto */}
            <div style={{ ...bloco, border: "1px solid rgba(56,189,248,0.25)", flexDirection: "column", alignItems: "stretch", gap: "10px" }}>
              <div style={{ ...labelStyle, marginBottom: 0 }}>VALOR FINAL PROPOSTO</div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "120px" }}>
                  <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "4px" }}>VALOR TOTAL (R$)</div>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "11px", color: "#38bdf8", fontWeight: 700, fontFamily: "monospace" }}>R$</span>
                    <input
                      type="number" min="0" step="0.01" value={simValor}
                      onChange={e => setSimValor(e.target.value)} placeholder="0,00"
                      style={{ ...inputStyle, fontSize: "13px", width: "100%", padding: "7px 12px 7px 32px" }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: "100px" }}>
                  <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "4px" }}>ENTRADA (%)</div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number" min="0" max="100" step="1" value={simEntradaPct}
                      onChange={e => setSimEntradaPct(e.target.value)} placeholder="0"
                      style={{ ...inputStyle, fontSize: "13px", width: "100%", padding: "7px 28px 7px 12px" }}
                    />
                    <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", color: "#38bdf8", fontWeight: 700 }}>%</span>
                  </div>
                </div>
              </div>
              {simValorEntrada !== null && (
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>VALOR DE ENTRADA</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#38bdf8" }}>R$ {fmt(simValorEntrada)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>SALDO RESTANTE</div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#7dd3fc" }}>R$ {fmt(simSaldo)}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulador de Parcelamento */}
            <div style={{ ...bloco, border: `1px solid ${simSaldo !== null ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.06)"}`, flexDirection: "column", alignItems: "stretch", gap: "10px", opacity: simSaldo !== null ? 1 : 0.4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ ...labelStyle, marginBottom: 0 }}>SIMULADOR DE PARCELAMENTO</div>
                {simBase !== null && (
                  <div style={{ fontSize: "9px", color: "#38bdf8", fontFamily: "monospace" }}>
                    BASE: R$ {fmt(simBase)}
                  </div>
                )}
              </div>

              {/* Seletor de parcelas */}
              <div>
                <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "8px" }}>NÚMERO DE PARCELAS</div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[2,3,4,5,6,7,8,9,10,11,12].map(n => (
                    <button
                      key={n}
                      onClick={() => setSimParcelas(simParcelas === String(n) ? "" : String(n))}
                      style={{
                        width: "36px", height: "36px", borderRadius: "8px",
                        background: simParcelasNum === n ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${simParcelasNum === n ? "rgba(56,189,248,0.7)" : "rgba(255,255,255,0.1)"}`,
                        color: simParcelasNum === n ? "#38bdf8" : "#64748b",
                        fontSize: "13px", fontWeight: simParcelasNum === n ? 700 : 400,
                        fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s",
                      }}
                    >{n}x</button>
                  ))}
                </div>
              </div>

              {/* Resultado */}
              {simValorParcela !== null && simTabela !== null && (
                <div style={{ paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "10px" }}>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>TAXA DE VENDA</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#7dd3fc" }}>{simTabela.taxaVenda}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>TAXA DA PARCELA</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#7dd3fc" }}>{simTabela.taxaParcela}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>JUROS QUE VOCÊ PAGA</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#f87171" }}>R$ {fmt(simJurosTotal)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "2px" }}>VALOR DA PARCELA</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "#38bdf8" }}>{simParcelasNum}x R$ {fmt(simValorParcela)}</div>
                    </div>
                  </div>
                  <div style={{ borderRadius: "10px", padding: "12px 0px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px", marginBottom: "3px" }}>VOCÊ RECEBE</div>
                      <div style={{ fontSize: "26px", fontWeight: 700, color: "#4ade80", lineHeight: 1 }}>
                        R$ {fmt(simVoceRecebe)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Total Final Recebido */}
            {simVoceRecebe !== null && simValorEntrada !== null && (
              (() => {
                const totalRecebido = simValorEntrada + simVoceRecebe;
                const acima = totalFinal === null || totalRecebido >= totalFinal;
                const cor = acima ? "#4ade80" : "#f87171";
                const corBorda = acima ? "rgba(74,222,128,0.5)" : "rgba(248,113,113,0.5)";
                return (
                  <div style={{ ...bloco, border: `1px solid ${corBorda}`, padding: "16px 18px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={labelStyle}>TOTAL QUE VOCÊ RECEBE</div>
                      <div style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ color: "#38bdf8" }}>Entrada: R$ {fmt(simValorEntrada)}</span>
                        <span style={{ color: cor }}>+ Parcelamento: R$ {fmt(simVoceRecebe)}</span>
                      </div>
                      <div style={{ fontSize: "30px", fontWeight: 700, color: cor, lineHeight: 1 }}>
                        R$ {fmt(totalRecebido)}
                      </div>
                      {totalFinal !== null && (
                        <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                          {acima
                            ? `▲ R$ ${fmt(totalRecebido - totalFinal)} acima do valor final`
                            : `▼ R$ ${fmt(totalFinal - totalRecebido)} abaixo do valor final`}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()
            )}

            {/* Valor Final para a Cotação */}
            {simValorNum > 0 && (
              <div style={{ ...bloco, border: "1px solid rgba(217,119,6,0.5)", flexDirection: "column", alignItems: "stretch", gap: "10px", padding: "16px 18px" }}>
                <div style={labelStyle}>VALOR FINAL PARA A COTAÇÃO</div>

                {/* Valor total em destaque */}
                <div style={{ fontSize: "32px", fontWeight: 700, color: "#D97706", lineHeight: 1 }}>
                  R$ {fmt(simValorNum)}
                </div>

                {/* Entrada */}
                {simValorEntrada !== null && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "4px" }}>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px" }}>ENTRADA</div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#38bdf8" }}>R$ {fmt(simValorEntrada)}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>({simEntradaPctNum}%)</div>
                  </div>
                )}

                {/* Parcelas */}
                {simValorParcela !== null && simParcelasNum > 0 && (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <div style={{ fontSize: "9px", color: "#64748b", fontFamily: "monospace", letterSpacing: "1px" }}>PARCELAS</div>
                    <div style={{ fontSize: "15px", fontWeight: 600, color: "#7dd3fc" }}>{simParcelasNum}x de R$ {fmt(simValorParcela)}</div>
                  </div>
                )}

                {selecionados.some(s => s.temPdf) && (
                  <button onClick={gerarPdf} style={{
                    marginTop: "6px", background: "#D97706", color: "#fff", border: "none",
                    borderRadius: "10px", padding: "12px 20px", width: "100%",
                    fontSize: "14px", fontFamily: "inherit", cursor: "pointer",
                  }}>📄 Gerar PDF</button>
                )}
              </div>
            )}

            {/* Botão PDF quando bloco cotação não está visível */}
            {simValorNum <= 0 && selecionados.some(s => s.temPdf) && (
              <button onClick={gerarPdf} style={{
                background: "#D97706", color: "#fff", border: "none",
                borderRadius: "10px", padding: "14px 20px", width: "100%",
                fontSize: "14px", fontFamily: "inherit", cursor: "pointer",
              }}>📄 Gerar PDF</button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
