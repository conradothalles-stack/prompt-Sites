async function gerarCodigo() {
    const blocoCodigo = document.querySelector(".bloco-codigo");
    const resultadoSite = document.querySelector(".bloco-site");
    const texto = document.querySelector(".caixa-texto").value.trim();

    if (!texto) {
        blocoCodigo.textContent = "Por favor, descreva o seu negócio antes de gerar o site.";
        resultadoSite.srcdoc = "";
        return;
    }

    console.log("Gerando código...");
    blocoCodigo.textContent = "Aguarde... gerando o site.";
    resultadoSite.srcdoc = "";

    const prompt = `Você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

                    Regras de resposta:
                    - Responda SOMENTE com HTML e CSS puros
                    - Não use crases, markdown ou explicações
                    - Não use tags <img>

                    Identidade visual (capriche e surpreenda):
                    - Invente uma paleta de cores única que combine com a essência do negócio
                    - Escolha uma Google Font marcante via @import
                    - Use emojis grandes no lugar de imagens
                    - Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

                    Estrutura da página:
                    - Header com nome do negócio e menu
                    - Hero impactante com título, subtítulo e botão CTA
                    - Seção de diferenciais com emojis
                    - Depoimento de cliente
                    - Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`;

    try {
        const resposta = await fetch("/api/gerar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                texto
            })
        });

        const corpo = await resposta.text();
        if (!resposta.ok) {
            blocoCodigo.textContent = `Erro na API (${resposta.status}): ${corpo}`;
            console.error("Erro na API:", resposta.status, corpo);
            return;
        }

        let dados;
        try {
            dados = JSON.parse(corpo);
        } catch (erro) {
            blocoCodigo.textContent = "A resposta da API não pôde ser lida. Veja o console.";
            console.error("Falha ao analisar JSON:", erro, corpo);
            return;
        }

        const resultado = dados?.choices?.[0]?.message?.content || dados?.choices?.[0]?.text;
        if (!resultado) {
            blocoCodigo.textContent = "A resposta da IA não trouxe HTML válido.";
            console.error("Resposta inválida:", dados);
            return;
        }

        blocoCodigo.textContent = resultado;
        resultadoSite.srcdoc = formatResultadoParaSrcdoc(resultado);
    } catch (erro) {
        blocoCodigo.textContent = "Falha ao conectar com a API. Veja o console.";
        console.error("Erro de fetch:", erro);
    }
}

function formatResultadoParaSrcdoc(resultado) {
    let html = resultado.trim();

    if (html.startsWith("```")) {
        html = html.replace(/^```(?:html)?\s*/i, "").replace(/```$/i, "").trim();
    }

    if (!/<!doctype html>|<html|<head|<body/i.test(html)) {
        html = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"></head><body>${html}</body></html>`;
    }

    return html;
}
// Simulação de resposta da IA  
