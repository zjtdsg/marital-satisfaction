// 测试题目数据
const questions = [
    "我和伴侣的生活满足了我对爱情和婚姻的期待。",
    "我和伴侣重视与双方父母的关系。",
    "我可以向伴侣吐露我的任何事情。",
    "我和伴侣有共同的兴趣爱好。",
    "即便可能有过失，但我和伴侣愿意原谅对方。",
    "我和伴侣享受亲密时光，保持激情。",
    "伴侣曾瞒着我借贷或投资。",
    "我和伴侣会如实告知对方自己的收入情况。",
    "和伴侣拥抱和亲吻时，我感到幸福。",
    "我和伴侣时常互相表达爱意。",
    "我会在伴侣面前展现最真实的自己。",
    "我和伴侣愿意为改善家庭经济状况而努力。",
    "伴侣会在孩子或其他家人面前树立良好的榜样。",
    "我从未发现伴侣与他人进行暧昧的聊天或互动。",
    "伴侣会为家庭提供物质或精神支持。",
    "我和伴侣会努力为对方解决生活中的困扰",
    "伴侣很重视与我共度的时光。",
    "我无法想象与伴侣结束关系后的生活。",
    "在性生活中，我和伴侣能坦诚沟通。",
    "我和伴侣会定期制定家庭预算，沟通理财事宜。",
    "伴侣会根据家庭需求调整支出。",
    "我对伴侣的身材、外貌充满好感。",
    "如果能重来一次，我仍然会和现在的伴侣结婚（或同居/约会）",
    "我和伴侣会主动与对方分享生活中的琐事。",
    "我的家人对伴侣有很高的评价。",
    "我和伴侣将彼此视为唯一的性伴侣。",
    "我有时会想，除了伴侣，是否还有其他人更适合我。",
    "伴侣没有对我隐瞒过重要的事情。",
    "伴侣会主动分担家务劳动。",
    "我和伴侣适时放松，享受二人世界。",
    "我和伴侣尊重彼此的隐私和个人空间。",
    "和伴侣在一起，我感到温暖和幸福。",
    "我和伴侣在性生活中关注彼此的感受和需求。",
    "我和伴侣重视维护个人和家庭的信用记录。",
    "伴侣会积极参与家庭决策，并用民主的方式进行。",
    "我能感受到伴侣的魅力，这对我很有吸引力。",
    "当我遇到困难或心情低落时，我会第一个想到伴侣。",
    "伴侣能在工作、其他社交生活和与我相处之间保持平衡。",
    "我对和伴侣的关系很有自信，我们对彼此忠贞不渝。",
    "当我为家庭付出时，伴侣会称赞或奖励我。",
    "我（或伴侣）仍然和前任保持着联系。",
    "当要购买家庭物品（例如：家电、汽车）时，我会和伴侣一起商量后在购买。",
    "伴侣尊重我的个性，并鼓励我追求我的梦想。",
    "我和伴侣很少冷战，会坦诚、平和地交流我们的分歧。",
    "伴侣对金钱上的把控欲望过高，让我感到不适或有压力。",
    "伴侣的一些生活习惯让我难以接受。",
    "没有同处一处时，伴侣也会和我保持联络和分享。",
    "伴侣会常常送我礼物或制造惊喜。"
];

// 维度定义
const dimensions = {
    intimacy: {
        name: "亲密关系",
        questions: [6, 9, 19, 22, 30, 33, 36, 48], // 题目编号（从1开始）
        negative: [] // 全部正面
    },
    loyalty: {
        name: "忠诚",
        questions: [7, 14, 26, 27, 28, 39, 41],
        negative: [7, 27, 41] // 负面题目
    },
    responsibility: {
        name: "家庭责任",
        questions: [2, 13, 15, 25, 35, 40],
        negative: [] // 全部正面
    },
    finance: {
        name: "经济管理",
        questions: [8, 12, 20, 21, 34, 42, 45],
        negative: [45] // 负面题目
    },
    daily: {
        name: "日常生活",
        questions: [24, 29, 31, 38, 44, 46],
        negative: [46] // 负面题目
    },
    emotion: {
        name: "情感联系",
        questions: [1, 3, 4, 5, 10, 11, 16, 17, 18, 23, 32, 37, 43, 47],
        negative: [] // 全部正面
    }
};

// 应用状态
let currentQuestion = 0;
let answers = new Array(48).fill(null);

// DOM元素
const introScreen = document.getElementById('intro-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progressFill = document.getElementById('progress-fill');
const optionButtons = document.querySelectorAll('.option-btn');

// 初始化
totalQuestionsSpan.textContent = questions.length;

// 开始测试
startBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    testScreen.classList.add('active');
    showQuestion(0);
});

// 显示题目
function showQuestion(index) {
    currentQuestion = index;
    questionText.textContent = `${index + 1}. ${questions[index]}`;
    currentQuestionSpan.textContent = index + 1;
    
    // 更新进度条
    const progress = ((index + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // 更新选项按钮状态 - 先清空所有选中状态
    optionButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 如果当前题目有答案，显示对应的选中状态
    if (answers[index] !== null) {
        optionButtons.forEach(btn => {
            if (parseInt(btn.dataset.value) === answers[index]) {
                btn.classList.add('selected');
            }
        });
    }
    
    // 更新导航按钮
    prevBtn.disabled = index === 0;
    nextBtn.disabled = answers[index] === null;
    
    // 如果已答完所有题目，下一题按钮显示为"查看结果"
    if (index === questions.length - 1 && answers[index] !== null) {
        nextBtn.textContent = '查看结果';
    } else {
        nextBtn.textContent = '下一题';
    }
}

// 选项按钮点击事件
optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        answers[currentQuestion] = value;
        
        // 更新按钮状态 - 先清空所有选中状态
        optionButtons.forEach(b => b.classList.remove('selected'));
        // 然后选中当前点击的按钮
        btn.classList.add('selected');
        
        // 启用下一题按钮
        nextBtn.disabled = false;
        
        // 如果是最后一题，更新按钮文字
        if (currentQuestion === questions.length - 1) {
            nextBtn.textContent = '查看结果';
        }
    });
});

// 上一题
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
    }
});

// 下一题
nextBtn.addEventListener('click', () => {
    if (answers[currentQuestion] === null) {
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        // 显示结果
        showResults();
    }
});

// 计算分数
function calculateScore(dimension) {
    let totalScore = 0;
    let count = 0;
    
    dimension.questions.forEach(qNum => {
        const answer = answers[qNum - 1]; // 题目编号从1开始，数组从0开始
        if (answer !== null) {
            let score = answer;
            // 如果是负面题目，需要反向计分
            if (dimension.negative.includes(qNum)) {
                score = 8 - answer; // 反向：1变7，2变6，...，7变1
            }
            totalScore += score;
            count++;
        }
    });
    
    if (count === 0) return 0;
    
    const averageScore = totalScore / count;
    // 分数 = (平均得分 - 1) / 6 * 100
    const finalScore = ((averageScore - 1) / 6) * 100;
    return Math.round(finalScore * 10) / 10; // 保留一位小数
}

// 显示结果
function showResults() {
    testScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    const dimensionResults = document.getElementById('dimension-results');
    dimensionResults.innerHTML = '';
    
    const scores = {};
    
    // 计算各维度分数
    Object.keys(dimensions).forEach(key => {
        const dimension = dimensions[key];
        const score = calculateScore(dimension);
        scores[key] = score;
        
        // 创建结果元素
        const resultDiv = document.createElement('div');
        resultDiv.className = 'dimension-result';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'dimension-name';
        nameDiv.innerHTML = `
            <span>${dimension.name}</span>
            <span class="dimension-score">${score}分</span>
        `;
        
        const barContainer = document.createElement('div');
        barContainer.className = 'score-bar-container';
        
        const bar = document.createElement('div');
        bar.className = 'score-bar';
        
        const barFill = document.createElement('div');
        barFill.className = 'score-bar-fill';
        barFill.style.width = score + '%';
        
        bar.appendChild(barFill);
        barContainer.appendChild(bar);
        
        resultDiv.appendChild(nameDiv);
        resultDiv.appendChild(barContainer);
        dimensionResults.appendChild(resultDiv);
    });
    
    // 生成建议
    generateRecommendations(scores);
}

// 生成建议
function generateRecommendations(scores) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<h3>测试建议</h3>';
    
    const recommendations = [];
    
    // 为每个维度生成建议
    Object.keys(dimensions).forEach(key => {
        const dimension = dimensions[key];
        const score = scores[key];
        let suggestion = '';
        
        if (score >= 80) {
            suggestion = `${dimension.name}维度得分${score}分，表现优秀！继续保持良好的沟通和互动。`;
        } else if (score >= 60) {
            suggestion = `${dimension.name}维度得分${score}分，表现良好，但仍有提升空间。建议多关注此方面的沟通和改善。`;
        } else if (score >= 40) {
            suggestion = `${dimension.name}维度得分${score}分，需要关注。建议与伴侣坦诚沟通，共同寻找改善方法。`;
        } else {
            suggestion = `${dimension.name}维度得分${score}分，需要重点关注。建议寻求专业咨询或与伴侣深入沟通，制定改善计划。`;
        }
        
        recommendations.push(suggestion);
    });
    
    // 总体建议
    const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
    let overallSuggestion = '';
    
    if (averageScore >= 80) {
        overallSuggestion = '总体而言，您的婚姻满意度很高！继续保持良好的沟通和互动，定期进行情感交流。';
    } else if (averageScore >= 60) {
        overallSuggestion = '总体而言，您的婚姻满意度良好。建议关注得分较低的维度，与伴侣共同制定改善计划。';
    } else if (averageScore >= 40) {
        overallSuggestion = '总体而言，您的婚姻满意度需要关注。建议与伴侣进行深入沟通，必要时寻求专业婚姻咨询师的帮助。';
    } else {
        overallSuggestion = '总体而言，您的婚姻满意度较低。强烈建议寻求专业婚姻咨询师的帮助，与伴侣共同面对和解决问题。';
    }
    
    recommendations.push(`<strong>总体建议：</strong>${overallSuggestion}`);
    
    // 显示建议
    recommendations.forEach(rec => {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.innerHTML = rec;
        recommendationsDiv.appendChild(item);
    });
}

// 重新测试
restartBtn.addEventListener('click', () => {
    answers = new Array(48).fill(null);
    currentQuestion = 0;
    resultScreen.classList.remove('active');
    introScreen.classList.add('active');
});
