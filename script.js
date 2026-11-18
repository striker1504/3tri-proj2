
const form = document.getElementById("career-form");
const resultsSection = document.getElementById("resultados");
const restartButton = document.getElementById("restart-button");

const careerData = {
  tecnologia: {
    area: "Desenvolvimento de software, análise de dados e tecnologia.",
    skill: "Lógica de programação, resolução de problemas e projetos práticos.",
    firstStep: "Explore uma linguagem de programação e desenvolva um pequeno projeto."
  },
  design: {
    area: "Design gráfico, UX/UI, produto digital e direção criativa.",
    skill: "Criatividade, comunicação visual e compreensão das necessidades dos usuários.",
    firstStep: "Crie um projeto de design e organize-o em um portfólio."
  },
  negocios: {
    area: "Gestão, administração, estratégia e empreendedorismo.",
    skill: "Planejamento, comunicação, análise de problemas e organização.",
    firstStep: "Escolha um problema real e desenvolva uma proposta de solução."
  },
  saude: {
    area: "Profissões ligadas à saúde, prevenção e qualidade de vida.",
    skill: "Empatia, comunicação, estudo contínuo e conhecimento técnico específico.",
    firstStep: "Pesquise as formações, os requisitos e as possibilidades de atuação da área."
  },
  educacao: {
    area: "Ensino, treinamento, educação corporativa e desenvolvimento humano.",
    skill: "Didática, comunicação, escuta ativa e organização de conteúdos.",
    firstStep: "Prepare uma pequena aula ou material educativo sobre um tema que domina."
  },
  marketing: {
    area: "Marketing digital, conteúdo, comunicação e estratégia de marca.",
    skill: "Escrita, criatividade, análise de resultados e conhecimento de público.",
    firstStep: "Desenvolva uma campanha fictícia e defina como avaliaria seus resultados."
  },
  engenharia: {
    area: "Engenharia, projetos, processos e inovação tecnológica.",
    skill: "Raciocínio analítico, matemática aplicada e resolução de problemas.",
    firstStep: "Pesquise projetos da área e escolha um problema técnico para estudar."
  },
  indefinido: {
    area: "Exploração de diferentes áreas antes de escolher uma direção.",
    skill: "Autoconhecimento, pesquisa profissional e identificação de interesses.",
    firstStep: "Liste três atividades que você gosta e pesquise profissões relacionadas."
  }
};

const experienceData = {
  inicio: {
    focus: "Construir fundamentos, conhecer profissões e desenvolver habilidades iniciais."
  },
  estudante: {
    focus: "Conectar os estudos à prática, buscar projetos e conhecer o mercado de trabalho."
  },
  transicao: {
    focus: "Identificar habilidades transferíveis e planejar a transição com etapas realistas."
  },
  crescimento: {
    focus: "Aprofundar conhecimentos, ampliar responsabilidades e demonstrar resultados."
  },
  empreender: {
    focus: "Validar uma ideia, conhecer seu público e estruturar um modelo de negócio."
  }
};

function createPlan(experience, goal) {
  const goalText = goal.trim();

  const firstTask = goalText
    ? `Transforme seu objetivo — "${goalText}" — em uma meta específica e alcançável.`
    : "Escreva um objetivo profissional claro para os próximos três meses.";

  const secondTask = experience === "estudante"
    ? "Identifique um projeto, curso ou atividade prática para complementar seus estudos."
    : experience === "transicao"
    ? "Liste cinco habilidades que você já possui e que podem ser úteis na nova carreira."
    : experience === "crescimento"
    ? "Identifique uma competência que ajudaria você a assumir novas responsabilidades."
    : experience === "empreender"
    ? "Converse com potenciais clientes para entender suas necessidades."
    : "Escolha uma habilidade importante para sua área e encontre um recurso de aprendizagem.";

  return [
    {
      title: "Defina sua direção",
      description: firstTask
    },
    {
      title: "Desenvolva uma competência",
      description: secondTask
    },
    {
      title: "Coloque o conhecimento em prática",
      description: "Realize um pequeno projeto, exercício ou atividade relacionada ao seu objetivo."
    },
    {
      title: "Avalie seu progresso",
      description: "Revise o que aprendeu, identifique dificuldades e defina o próximo passo."
    }
  ];
}

function renderPlan(steps) {
  const container = document.getElementById("plan-steps");
  container.replaceChildren();

  steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "plan-step";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `plan-step-${index}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;

    const title = document.createElement("span");
    title.textContent = `${index + 1}. ${step.title}`;

    const description = document.createElement("p");
    description.textContent = step.description;

    label.append(title, description);
    item.append(checkbox, label);
    container.append(item);

    checkbox.addEventListener("change", () => {
      item.classList.toggle("completed", checkbox.checked);
      updateProgress();
    });
  });

  updateProgress();
}

function updateProgress() {
  const checkboxes = [
    ...document.querySelectorAll("#plan-steps input[type='checkbox']")
  ];

  const completed = checkboxes.filter(box => box.checked).length;
  const total = checkboxes.length;
  const percentage = total ? (completed / total) * 100 : 0;

  document.getElementById("progress-fill").style.width = `${percentage}%`;
  document.getElementById("progress-label").textContent =
    `${completed} de ${total} etapas concluídas`;

  document.getElementById("plan-progress").setAttribute(
    "aria-label",
    `Progresso: ${completed} de ${total} etapas concluídas`
  );
}

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const interest = String(formData.get("interest") || "");
  const experience = String(formData.get("experience") || "");
  const goal = String(formData.get("goal") || "");

  const career = careerData[interest];
  const experienceInfo = experienceData[experience];

  if (!career || !experienceInfo) return;

  document.getElementById("result-title").textContent =
    `${name ? `${name}, seu` : "Seu"} caminho profissional começa aqui.`;

  document.getElementById("result-description").textContent =
    `Seu próximo passo é combinar seus interesses com ações práticas. ${experienceInfo.focus}`;

  document.getElementById("result-area").textContent = career.area;
  document.getElementById("result-skill").textContent =
    `${career.skill} ${experienceInfo.focus}`;
  document.getElementById("result-first-step").textContent = career.firstStep;

  renderPlan(createPlan(experience, goal));

  resultsSection.hidden = false;

  requestAnimationFrame(() => {
    resultsSection.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  });
});

restartButton.addEventListener("click", () => {
  form.reset();
  resultsSection.hidden = true;

  document.getElementById("plan-steps").replaceChildren();
  document.getElementById("progress-fill").style.width = "0%";
  document.getElementById("progress-label").textContent =
    "0 de 4 etapas concluídas";

  document.getElementById("inicio").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  document.getElementById("name").focus({ preventScroll: true });
});
