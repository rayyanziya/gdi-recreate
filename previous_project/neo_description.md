# Project: NeoTheorem

## What Is NeoTheorem?

NeoTheorem is a custom-built, full-stack **proprietary trading platform** designed for professional multi-account portfolio management. It combines order execution, performance analytics, automated signal routing, fundamental research, and system administration into a single unified interface. The platform is built for a single operator (master user) managing multiple brokerage sub-accounts simultaneously across global exchanges.

---

## Project Scope

NeoTheorem was engineered as an end-to-end trading operations platform. The project covers the following functional domains:

### 1. Order Management System (OMS)
A live trade execution interface that allows the operator to place, manage, and cancel orders across multiple accounts from a single panel. It supports limit and market order types, partial and full position sells, take-profit management, and real-time position tracking. All fills are routed through Interactive Brokers (IBKR) and logged in an execution blotter.

### 2. Multi-Account Portfolio Management
The platform manages 8 named brokerage accounts (Kuwait, London, Manisrenggo, Metro, Monaco, New York, Osaka, Rome), each linked to IBKR. Positions, P&L, and performance metrics are tracked independently per account and consolidated into a unified dashboard view.

### 3. Performance Analytics Dashboard
A consolidated analytics engine that calculates and displays professional-grade trading metrics including Win Rate, Profit Factor, Sharpe Ratio, Sortino Ratio, Max Drawdown, CAGR, TWR, MWR, Calmar Ratio, Expectancy, and Average Hold Time. It renders an equity curve, monthly returns bar chart, win/loss donut chart, and P&L breakdown (gross profit, manager fee, client net, commissions).

### 4. Automated Signal System
A signal routing engine that receives trading signals and broadcasts them to all connected accounts simultaneously. Each signal entry logs the ticker, trigger price, number of accounts targeted, execution count, failure count, error count, and per-account result badges. The system handles partial execution gracefully when some accounts are offline.

### 5. Financial Records & Reporting
A per-account financial record module that tracks total deposits, withdrawals, net cashflow, realized P&L, dividends, IBKR commissions, and net performance. It supports CSV export for deposits/withdrawals and dividends, and displays win rate on a per-account basis.

### 6. Trading Calendar
A calendar view that maps daily profitability and order activity by date. Each day shows realized P&L, number of buys, and number of sells. Clicking a day reveals the full order list with symbol, side, quantity, price, P&L per fill, and account.

### 7. Fundamentals Research Module
An AI-assisted fundamental analysis tool with three components:

- **Ticker Board** — a scored watchlist of up to 26 tickers, each rated 0–100 via a composite score (Valuation, Growth, Health, Momentum). Tickers are whitelisted or restricted based on score and operator review.
- **Research View** — an interactive knowledge graph that maps news articles and research queries around a central ticker, displaying sentiment (positive, negative, neutral) and topic clusters.
- **Grand Report** — an AI-generated investment report per ticker covering Fundamentals, News Sentiment, Risk Factors, Catalysts, Deep Insights, and Article Sources, with a Whitelist confidence percentage.

### 8. Events Calendar (Fundamentals)
Tracks corporate events (earnings dates, ex-dividend dates, dividend pay dates) for all watchlist tickers on a calendar interface, with an upcoming events sidebar showing a 300-day horizon.

### 9. Account Health Monitoring
A real-time connectivity dashboard showing online/offline status and latency (in milliseconds) for each of the 8 brokerage accounts. Offline accounts are visually flagged and automatically excluded from signal execution.

### 10. Audit & Activity Logging
Two audit systems run in parallel:

- **Audit Log (OMS)** — records every operator action at the account level: logins, order placements, order modifications, limit sells, trade interventions, service restarts, reconciliation runs, and account visibility toggles. Each entry includes a timestamp, user, action type, target account, and a JSON detail payload.
- **Activity Audit (Manage)** — tracks all platform-level activity by category (e.g., Fundamentals: ticker analyzed, bulk import). Displays total actions, logins, unique IPs, and devices.

### 11. User Management
A user administration panel supporting multiple roles. The Master user (operator) has full access to all accounts. Client users can be scoped to a limited number of accounts. Supports new user creation, role assignment, and access control.

### 12. Reconciliation
A dedicated reconciliation module that can be manually triggered per account to verify position and cash consistency between the platform and the broker.

---

## Technology & Infrastructure Observations

- **Broker Integration:** Interactive Brokers (IBKR) — live market data, order routing, commission tracking
- **Market Data:** Real-time feeds for S&P 500, Dow Jones, Nasdaq, VIX, Bitcoin, Gold, and local FX
- **Execution:** Supports DARK pool routing for institutional-style fills
- **Multi-timezone:** Simultaneous display of ET, WIB (Western Indonesia), and UTC clocks
- **UI:** Dark-themed single-page application, likely React or similar frontend framework
- **Accounts:** 8 sub-accounts with independent P&L, deposits, and IBKR account IDs

---

## Key Design Principles

- **Centralized control** — one operator managing many accounts from a single interface
- **Signal automation** — reducing manual order entry by broadcasting signals to all accounts simultaneously
- **Transparency** — full audit trail of every action, every order, and every account event
- **Research-driven** — fundamental scoring and AI-generated grand reports integrated directly into the trading workflow
- **Fee-aware** — manager fee and IBKR commission tracking built into P&L reporting from the ground up

---

## Project Status (as observed)

The platform is in **active production use**. At the time of the captured screenshots:

- 5 of 8 accounts were online and actively trading
- 13 open positions were live across multiple accounts
- 123 closed trades had been completed with a 94.31% win rate
- Total realized P&L stood at $1,897.04 with an equity value of approximately $20,085.07
- The Fundamentals module was actively running background article extraction tasks for multiple tickers simultaneously

---

*This document describes the NeoTheorem platform as observed from engineering screenshots. Intended for use as a RAG reference document.*
